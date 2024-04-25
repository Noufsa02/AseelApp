//Ghadee, [4/23/2024 8:12 PM]
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
const isActive = true;

const Community = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPostImage(result.uri);
    }
  };

  const handleAddPost = () => {
    if (postText.trim() || postImage) {
      const newPost = {
        id: posts.length + 1,
        text: postText,
        image: postImage,
        time: new Date().toLocaleTimeString(),
        likes: 0
      };
      setPosts([newPost, ...posts]);
      setPostText('');
      setPostImage(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>المجتمع</Text>
      </View>

      <ScrollView style={styles.content}>
        {posts.map(post => (
          <View key={post.id} style={styles.post}>
            <Image
              source={{ uri: "https://placehold.it/100x100" }} // Placeholder for user avatar
              style={styles.avatar}
            />
            <View style={styles.postContent}>
              {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
              <Text style={styles.postText}>{post.text}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
              <View style={styles.postActions}>
                <Text style={styles.likes}>{post.likes} الإعجابات</Text>
                <FontAwesome5 name="heart" size={16} color="red" />
              </View>
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
          <FontAwesome5 name="image" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddPost} style={styles.button}>
          <Text style={styles.buttonText}>نشر</Text>
        </TouchableOpacity>
      </View>

      

      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <FontAwesome5 name="user" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="map" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UploadAndCapture')}>
          <FontAwesome5 name="camera" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <FontAwesome5 name="comments" size={isActive ? 26 : 24} color={isActive ? "#ffffff" : "#F9E4D4"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="home" size={24} color="#F9E4D4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//Ghadee, [4/23/2024 8:12 PM]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6D0', 
  },
  header: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1, 
  },
  post: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  postText: {
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
    color: 'grey',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  postImage: {
    width: '100%',
    height: 200, // Adjust height as needed
    resizeMode: 'cover', // Cover, contain, etc.
    borderRadius: 10,
  },
  imagePickerButton: {
    marginRight: 10,
  },
  /* likes: {
    fontSize: 14,
    marginRight: 10,
  }, */
  inputContainer: {
    flexDirection: 'row',
    padding: 50,
    alignItems: 'center',
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
  button: {
    backgroundColor: '#8F181C',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#8F181C',
    paddingVertical: 3,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Community;