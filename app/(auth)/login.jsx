import { View, Text, StyleSheet, TouchableOpacity, ScrollView,ToastAndroid ,Image,Platform, Alert } from 'react-native'
import icons from '@/constants/icons'
import images from '@/constants/images'
import Input from '@/components/Input'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { useNavigation, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import {loginFunc,getUser} from '../../config/appWrite_config'
import { useGlobalContext } from '@/context/GlobalContext';

//import Googleauth from '@/components/Googleauth'

export default function LoginPage() {
  const { setUser, setIsLogged } = useGlobalContext();
 const [isSubmitting, setSubmitting] = useState(false);
 const [form,setForm] = useState({email:'',password:''})  
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])
 
  const LoginAccount = async () => {  
    console.log('Clicked');
    if (!form.email || !form.password) {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please enter all fields...", ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", "Please enter all fields...");
      }
    }
    setSubmitting(true);

    try {
      await loginFunc(form.email, form.password);
      const result = await getUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{height:'100%',backgroundColor:'#111133'}}>
    <ScrollView >
        <View style={{margin:20,padding:20}}>
          <Image source={images.logo}  style={{width:110,height:35}} resizeMode='contain'/>
          <Text style={{padding:10,fontFamily:'Lora',fontSize:20,fontWeight:'bold',color:'rgb(236, 170, 65)'}}>Welcome to the Login Page</Text>
            </View>
            <View style={styles.container}>
               <Input
              lable="Email"
              placeholder="Enter your email"
              placeColor = 'rgb(140, 101, 218)'
              placeTextColor='rgba(236, 170, 65, 0.7)'
              lableStyle={styles.label}
              inputStyle={styles.input}
              icon={icons.email}
              value={form.email}
              onChangeText={(text)=>setForm({...form,email:text})}
    
              />
               <Input 
              lable="Password"
              placeholder ="Enter your password"
              placeColor = 'rgb(140, 101, 218)'
              placeTextColor='rgba(236, 170, 65, 0.7)'
              lableStyle={styles.label}
              inputStyle={styles.input}
              icon={icons.lock}
              value={form.password}
              onChangeText={(text)=>setForm({...form,password:text})}
    
              />
           <Button handlePress={LoginAccount}
            button="Login"/>
           <TouchableOpacity style={{alignItems:'center',paddingTop:10}} onPress={()=>router.push('./register')}>
           <Text style={{color:'#777999',fontWeight:'bold'}}>Make an Account</Text>
           </TouchableOpacity>
          
        </View>
      </ScrollView>
      </SafeAreaView>
      )
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      label: {
        fontSize: 17,
        margin:10,
        fontFamily:'Lora',
        color:'rgb(241, 239, 237)'
      },
      input: {
        color: 'rgb(211, 209, 218)',
      },
    })