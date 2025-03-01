import { View, Text, Image, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images'
import Button from '../components/Button';

export default function HomeScreen() {
    const r =useRouter()
  return (
    <SafeAreaView style={{height:'100%',backgroundColor:'#111133'}}>
        <ScrollView contentContainerStyle={{height:'100%'}}>
            <View style={{height:'100%',width:'100%',padding:5,alignItems:'center'}}>
                <Image source={images.logo} resizeMode='center'/>
                <Image source={images.cards} resizeMode='contain' style={{maxHeight:350,maxWidth:300}}/>
                <View style={{position:'relative',margin:5}}>
                    <Text style={{color:'#fffddd',textAlign:'center',fontSize:40}}>Discover Endless Possibilities with  
                    <Text style={{color:'#ffd000',fontSize:45,fontFamily:'Lora'}}>{' '}Aora</Text>
                    </Text>
                        <Image source={images.path} style={{position:'absolute', bottom:-10,right:150 ,height:20}}/>
                </View>
                <Text style={{color:'#fffddd',textAlign:'center',fontSize:20,fontFamily:'PoppLight',padding:20}}> Where Creativity Meets Innovation: Embark on a Journey of Limitless
                Exploration with Aora</Text>
                <Button button={'Start Now'} isLoading={false} handlePress={()=> r.push('/home')}/>
            </View>
        </ScrollView>
        <StatusBar backgroundColor='#ddfddd' style='light'/>
    </SafeAreaView>
  )
}