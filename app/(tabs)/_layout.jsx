import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image} from 'react-native';
import icons from '@/constants/icons'


export default function TabLayout() {
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
        name="home"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({color})=>(
          <TabIcons 
          icon={icons.home}
          color={color}
          />      
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarIcon: ({color})=>(
            <TabIcons 
            icon={icons.profile}
            color={color}
          />
          )
        }}
      />
      <Tabs.Screen
      name ="create"
      options={{
        title: 'Create', headerShown: true,
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
