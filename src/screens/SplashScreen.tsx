import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/type';

type Props = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoWrap}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>PS</Text>
        </View>
      </View>
      <Text style={styles.title}>PolyShine Barber</Text>
      <Text style={styles.subtitle}>Ứng dụng quản lý lịch và chấm công dành cho nhân viên</Text>
      <ActivityIndicator size="large" color="#ff7a18" style={styles.loader} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrap: {
    marginBottom: 16,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ffefea',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffd4bf',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  logoLetter: {
    fontSize: 32,
    color: '#ff7a18',
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b6b6b',
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
