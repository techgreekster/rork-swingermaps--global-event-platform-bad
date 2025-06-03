import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { User, Mail, Lock, Facebook } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const router = useRouter();
  const { signup, loginWithSocial, isLoading, error } = useAuthStore();
  
  const validateForm = () => {
    let isValid = true;
    
    // Validate name
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };
  
  const handleSignup = async () => {
    if (!validateForm()) return;
    
    try {
      await signup(name, email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Signup Failed', 'Please try again with different credentials.');
    }
  };
  
  const handleSocialLogin = async (provider: 'facebook' | 'google') => {
    try {
      await loginWithSocial(provider);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Signup Failed', `${provider} signup failed. Please try again.`);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started with swingerMaps</Text>
        </View>
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            leftIcon={<User size={20} color={colors.darkGray} />}
            error={nameError}
          />
          
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={colors.darkGray} />}
            error={emailError}
          />
          
          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            leftIcon={<Lock size={20} color={colors.darkGray} />}
            isPassword
            error={passwordError}
          />
          
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon={<Lock size={20} color={colors.darkGray} />}
            isPassword
            error={confirmPasswordError}
          />
          
          <Button
            title="Sign Up"
            onPress={handleSignup}
            loading={isLoading}
            style={styles.signupButton}
          />
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <Button
            title="Continue with Facebook"
            onPress={() => handleSocialLogin('facebook')}
            variant="secondary"
            style={styles.socialButton}
            icon={<Facebook size={20} color={colors.white} />}
          />
          
          <Button
            title="Continue with Google"
            onPress={() => handleSocialLogin('google')}
            variant="outline"
            style={styles.socialButton}
            textStyle={{ color: colors.text }}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  form: {
    marginBottom: 24,
  },
  signupButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.darkGray,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: 16,
  },
  footerText: {
    color: colors.darkGray,
    fontSize: 16,
  },
  loginText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});