import { 
  View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert 
} from 'react-native';
import icons from '@/constants/icons';
import images from '@/constants/images';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useNavigation, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUser } from '@/config/appWrite_config';
import { useGlobalContext } from '@/context/GlobalContext';

export default function SignUp() { 
  const router = useRouter();
  const Navig = useNavigation();
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Navig.setOptions({ headerShown: false });
  }, []);

  // Email Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password Validation 
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (!minLength) return "Password must be at least 8 characters long.";
    if (!hasUppercase) return "Password must include at least one uppercase letter.";
    if (!hasLowercase) return "Password must include at least one lowercase letter.";
    if (!hasNumber) return "Password must contain at least one number.";
    if (!hasSpecialChar) return "Password must contain at least one special character (@, $, !, %, *, ?, &).";

    return true;
  };

  const CreateAccount = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Invalid email format.");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      Alert.alert("Weak Password", passwordValidation);
      return;
    }

    setSubmitting(true);

    try {
      const result = await createUser(email, password, username);
      setUser(result);
      setIsLogged(true);

      router.replace("(tabs)/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Create an Account</Text>
        </View>
        <View style={styles.container}>
          <Input
            label="Username"
            placeholder="Enter your username"
            placeColor="rgb(140, 101, 218)"
            placeTextColor="rgba(236, 170, 65, 0.7)"
            labelStyle={styles.label}
            inputStyle={styles.input}
            icon={icons.person}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            placeColor="rgb(140, 101, 218)"
            placeTextColor="rgba(236, 170, 65, 0.7)"
            labelStyle={styles.label}
            inputStyle={styles.input}
            icon={icons.email}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            placeColor="rgb(140, 101, 218)"
            placeTextColor="rgba(236, 170, 65, 0.7)"
            labelStyle={styles.label}
            inputStyle={styles.input}
            icon={icons.lock}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button handlePress={CreateAccount} button="Signup" isLoading={isSubmitting} />
          <TouchableOpacity 
            style={styles.loginRedirect} 
            onPress={() => router.push('../(tabs)/profile')}>
            <Text style={styles.loginText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    backgroundColor: '#111133',
  },
  header: {
    margin: 20,
    padding: 20,
  },
  logo: {
    width: 110,
    height: 35,
  },
  title: {
    padding: 10,
    fontFamily: 'Lora',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(236, 170, 65)',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 17,
    margin: 10,
    fontFamily: 'Lora',
    color: 'rgb(241, 239, 237)',
  },
  input: {
    borderColor: '#000',
  },
  loginRedirect: {
    alignItems: 'center',
    paddingTop: 10,
  },
  loginText: {
    color: '#777999',
    fontWeight: 'bold',
  },
});

