import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import GlobalProvider from '@/context/GlobalContext';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Spicy: require('../assets/fonts/SpicyRice-Regular.ttf'),
    Lime: require('../assets/fonts/Limelight-Regular.ttf'),
    Lora: require('../assets/fonts/Lora-Regular.ttf'),
    Play: require('../assets/fonts/PlaywriteCAGuides-Regular.ttf'),
    Popp: require('../assets/fonts/Poppins-Black.ttf'),
    PooLight: require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
    </Stack>
  </GlobalProvider>  
  );
}
