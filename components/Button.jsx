import { View, Text, TouchableOpacity ,ActivityIndicator} from 'react-native'
import React from 'react'

export default function Button({button,handlePress,isLoading}) {
  return (
    
      <TouchableOpacity onPress={handlePress} style={{
        backgroundColor:'rgb(245, 250, 233)',
        padding: 15,
        borderRadius: 15,
        opacity: isLoading ? 0.4 : 1,
      }} 
        >
        <Text style={{fontFamily:"Lime",color:'rgb(207, 143, 40)',textAlign:'center',fontSize:20}}>{button}</Text>
        {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
        />
      )}
        </TouchableOpacity>
    
  )
}