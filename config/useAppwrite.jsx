import { useState,useEffect } from 'react'
import {Alert } from 'react-native';

export default function useAppwrite(fn) {
    const [data,setData ] =useState([])
    const [loading,setLoading]= useState(false)

    const fetchData = async ()=>{
        setLoading(true)
        try {
              const response = await fn()
              setData (response)
        } catch(err){
          Alert.alert('Error:', err.message)
        } finally{
                setLoading(false)
        }
      }
    
  useEffect(()=>{
    
    fetchData()
  },[])

  const refetch = ()=> fetchData()

  return { data, loading ,refetch}
}