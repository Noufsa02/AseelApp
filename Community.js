import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const Community = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [username, setUsername] = useState('');
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
            image: doc.data().postImage,
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
      console.error('You have to write something');
      return;
    }

    let downloadUrl = null;
    if (postImage) {
      const resp = await fetch(postImage);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg');
      await uploadBytes(storageRef, blob);
      downloadUrl = await getDownloadURL(storageRef);
    }

    const currentUser = FIREBASE_AUTH.currentUser;
    const userRef = doc(FIREBASE_DB, 'users', currentUser.uid);

    onSnapshot(userRef, (doc) => {
      const userData = doc.data();
      setUsername(userData.firstName);
    });

    const docRef = await addDoc(collection(FIREBASE_DB, "Posts"), {
      postText,
      postImage: downloadUrl,
      userId: currentUser.uid,
      time: new Date().toLocaleTimeString(),
      likes: 0,
      username,
    });
    console.log("Document written with ID: ", docRef.id);

    const newPost = {
      id: posts.length + 1,
      text: postText,
      image: downloadUrl,
      time: new Date().toLocaleTimeString(),
      likes: 0,
      username,
    };
    setPosts([newPost, ...posts]);
    setPostText('');
    setPostImage(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPostImage(result.assets[0].uri);
    }
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
            {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
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
        <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
          {postImage ? (
            <Image source={{ uri: postImage }} style={{ width: 50, height: 50, borderRadius: 10, resizeMode: 'contain' }} />
          ) : (
            <FontAwesome5 name="image" size={30} color="black" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleAddPost} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6D0',
  },
  content: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#FAF6D0',
    borderBlockColor: 'black',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
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
  postImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
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
  button: {
    backgroundColor: '#1DA1F2',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  }
});

export default Community;
