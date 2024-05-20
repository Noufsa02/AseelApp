import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Modal, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, getDocs, onSnapshot, doc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const { width, height } = Dimensions.get('window');

const Community = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [postImages, setPostImages] = useState([]); // Updated to store multiple images
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image to view
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const storage = getStorage();

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "Posts"));
        const postsArray = [];
        querySnapshot.forEach((doc) => {
          postsArray.push({
            id: doc.id,
            text: doc.data().postText,
            images: doc.data().postImages || [], // Ensure images is an array
            username: doc.data().username,
            timestamp: doc.data().timestamp,
          });
        });
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    if (!postText) {
      Alert.alert('Error', 'You have to write something');
      return;
    }

    let downloadUrls = [];
    try {
      for (const postImage of postImages) {
        const resp = await fetch(postImage);
        const blob = await resp.blob();
        const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg');
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        downloadUrls.push(downloadUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      return;
    }

    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      const userRef = doc(FIREBASE_DB, 'users', currentUser.uid);

      onSnapshot(userRef, (doc) => {
        const userData = doc.data();
        setUsername(userData.firstName);
      });

      const docRef = await addDoc(collection(FIREBASE_DB, "Posts"), {
        postText,
        postImages: downloadUrls,
        userId: currentUser.uid,
        time: new Date().toLocaleTimeString(),
        likes: 0,
        username,
      });
      console.log("Document written with ID: ", docRef.id);

      const newPost = {
        id: posts.length + 1,
        text: postText,
        images: downloadUrls,
        time: new Date().toLocaleTimeString(),
        likes: 0,
        username,
      };
      setPosts([newPost, ...posts]);
      setPostText('');
      setPostImages([]); // Reset images after posting
    } catch (error) {
      console.error("Error adding post:", error);
      Alert.alert('Error', 'Failed to add post. Please try again.');
    }
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true, // Allows multiple image selection
    });

    if (!result.cancelled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setPostImages([...postImages, ...selectedImages]); // Append new images to the existing list
    }
  };

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <View style={styles.header}>
              <FontAwesome5 name="user-circle" size={40} color="gray" style={styles.avatar} />
              <View style={styles.headerText}>
                <View style={styles.userDetails}>
                  <Text style={styles.username}>{post.username}</Text>
                  <Text style={styles.timestamp}>{post.timestamp}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            <View style={styles.imagesContainer}>
              {post.images && post.images.map((image, imgIndex) => (
                <TouchableOpacity key={imgIndex} onPress={() => handleImagePress(image)}>
                  <Image source={{ uri: image }} style={styles.postImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome5 name="comment" size={16} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome5 name="retweet" size={16} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome5 name="heart" size={16} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome5 name="share" size={16} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's happening?"
          value={postText}
          onChangeText={setPostText}
        />
        <TouchableOpacity onPress={pickImages} style={styles.imagePickerButton}>
          {postImages.length > 0 ? (
            <View style={styles.imagePreviewContainer}>
              {postImages.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                  <Image source={{ uri: image }} style={styles.imagePreview} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <FontAwesome5 name="image" size={30} color="black" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleAddPost} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <Modal visible={modalVisible} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0C8',
    paddingTop: 20, // Add space at the top
  },
  content: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#EDE0C8',
    borderBlockColor: 'black',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    marginBottom: 10, // Add space between posts
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DA1F2',
    marginRight: 5,
    marginTop:-20,
  },
  timestamp: {
    color: 'gray',
    fontSize: 14,
  },
  postText: {
    marginTop: 5,
    fontSize: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  postImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 12,
    padding: 80,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  imagePickerButton: {
    padding: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagePreview: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: 'contain',
    margin: 5,
  },
  button: {
    backgroundColor: '#1DA1F2',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.9,
  },
});

export default Community;



