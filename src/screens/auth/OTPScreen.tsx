import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OTPScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <Text style={styles.subtitle}>Mã xác thực đã được gửi đến số điện thoại của bạn</Text>
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
        <Text style={styles.btnText}>Quay lại</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#666', textAlign: 'center', marginBottom: 20, paddingHorizontal: 20 },
  btn: { padding: 10, backgroundColor: '#ff7a18', borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
