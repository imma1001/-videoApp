import { View, Text, ScrollView ,StyleSheet,TouchableOpacity,Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as DocumentPicker from 'expo-document-picker'
import { createVideoPost  } from '../../config/appWrite_config'
import {useGlobalContext} from '@/context/GlobalContext'
import  icons  from "../../constants/icons";
import * as FileSystem from 'expo-file-system';

export default function create() {

  const { user } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  // Extract Video ID from YouTube URL
  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

const pickThumbnail = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      console.log("⚠️ No image selected");
      return;
    }

    let selectedUri = result.assets[0].uri;
    console.log("📷 Selected image (before conversion):", selectedUri);

    // Convert content:// to file://
    if (selectedUri.startsWith("content://")) {
      const fileName = selectedUri.split("/").pop(); // Extract file name
      const newUri = `${FileSystem.documentDirectory}${fileName}`;

      console.log("🔄 Converting to file:// format...");
      await FileSystem.copyAsync({
        from: selectedUri,
        to: newUri,
      });

      selectedUri = newUri;
      console.log("✅ Converted file path:", selectedUri);
    }

    setThumbnail(selectedUri); // Update state
  } catch (error) {
    console.error("❌ Error picking image:", error);
  }
};

  

  const handleSubmit = async () => {
    try {
      
      const videoId = extractVideoId(youtubeUrl.trim());
      if (!title || !youtubeUrl || !thumbnail || !videoId) {
        alert("Please enter a valid YouTube link and select a thumbnail.");
        return;
      }
  
      await createVideoPost(
        title,
        thumbnail,
        `https://www.youtube.com/watch?v=${videoId}`,
        prompt,
        user?.$id
      );
  
      alert("Video Post Created!");
      setTitle("");
      setPrompt("");
      setYoutubeUrl("");
      setThumbnail(null);
    } catch (error) {
      alert("Failed to create video post.");
    } 
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Text style={styles.header}>Create YouTube Post</Text>

      <Input
      lable='Enter the title'
      inputStyle={styles.input}
      lableStyle={styles.lable}
        placeholder="Enter video title..."
       placeTextColor='rgba(236, 170, 65, 0.7)'
        value={title}
        onChangeText={(text)=>setTitle(text)}
      />

      <Input
        lable='Enter The video Link'
        inputStyle={styles.input}
        lableStyle={styles.lable}
        placeholder="Paste YouTube link..."
        placeTextColor='rgba(236, 170, 65, 0.7)'
        value={youtubeUrl}
        onChangeText={(text)=>setYoutubeUrl(text)}
      />

      <TouchableOpacity onPress={pickThumbnail} style={styles.imagePicker}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.preview} />
        ) : (
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10}}>
          <Image style={{width:35,height:35}} source={icons.upload}/>
          <Text style={styles.uploadText}>Upload Thumbnail</Text>
          </View>
        )}
      </TouchableOpacity>
      <Input
        lable='Enter a video Description'
        inputStyle={styles.input}
        lableStyle={styles.lable}
        placeholder="Enter video discription..."
        placeTextColor='rgba(236, 170, 65, 0.7)'
        value={prompt}
        onChangeText={(text)=>setPrompt(text)}
      />

      <Button handlePress={handleSubmit} button={'Create Now'}/>
      </ScrollView>
    </SafeAreaView>

  )
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111133", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", color: "#FFF", marginBottom: 20 },
  lable: { fontSize: 17,margin:10,fontFamily:'Lora',color:'rgb(241, 239, 237)' },
  imagePicker: { backgroundColor: "#333", height: 220, justifyContent: "center", alignItems: "center", borderRadius: 15, marginBottom: 20 },
  icon: { width: 24, height: 24, marginRight: 10 },
  preview: { width: "100%", height: "100%", borderRadius: 5 },
  uploadText: { color: "#FFF", fontSize: 16 },
  input: {color: 'rgb(211, 209, 218)',},
})