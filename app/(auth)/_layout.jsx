import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image} from 'react-native';
import icons from '@/constants/icons'


export default function AuthLayout() {
          function TabIcons({icon,color}){
            return(
            <View>
              <Image 
              source={icon}
              tintColor={color}
              resizeMode='center' 
              />
            </View>
            )
          }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4ffccc',
        tabBarInactiveTintColor:'#fffaaa',
        tabBarStyle: {
          backgroundColor:'#111133'
        }
       
      }}>
      <Tabs.Screen
      name ="login"
      options={{
        title: 'Login',
        headerShown: true,
        tabBarIcon: ({color})=>(
          <TabIcons 
          icon={icons.bookmark}
          color={color}
        />
        )

      }}
      />
      <Tabs.Screen
      name ="register"
      options={{
        title: 'Register',
         headerShown: true,
        tabBarIcon: ({color})=>(
          <TabIcons 
          icon={icons.plus}
          color={color}
        />
        )

      }}
      />
    </Tabs>
  );
}
