import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  function validate() {
    if (!identifier.trim()) return 'Vui lòng nhập email hoặc số điện thoại';
    if (!password) return 'Vui lòng nhập mật khẩu';
    if (password.length < 6) return 'Mật khẩu ít nhất 6 ký tự';
    return null;
  }

  function handleLogin() {
    // const err = validate();
    // if (err) {
    //   Alert.alert('Lỗi', err);
    //   return;
    // }
    setLoading(true);
    // Demo: giả lập API call
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainTab');
    }, 1500);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.content}>
            {/* Header trên cùng */}
            <View style={styles.top}>
              <View style={styles.logoWrap}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoLetter}>P</Text>
                </View>
              </View>

              <Text style={styles.title}>PolyShine Barber</Text>
              <Text style={styles.subtitle}>
                Đăng nhập để quản lý lịch và chấm công
              </Text>
            </View>

            {/* Form ở giữa màn hình */}
            <View style={styles.middle}>
              <View style={styles.form}>
                <Text style={styles.label}>Email hoặc số điện thoại</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập email hoặc số điện thoại"
                  autoCapitalize="none"
                  value={identifier}
                  onChangeText={setIdentifier}
                  returnKeyType="next"
                  accessible
                  accessibilityLabel="Email hoặc số điện thoại"
                />

                <Text style={[styles.label, { marginTop: 12 }]}>Mật khẩu</Text>
                <View style={styles.pwdRow}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={!showPwd}
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType="done"
                    accessible
                    accessibilityLabel="Mật khẩu"
                  />
                </View>

                <View style={styles.rowBetween}>
                  <TouchableOpacity 
                    style={styles.rememberRow} 
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <View style={[styles.checkbox, rememberMe && styles.checked]}>
                       {rememberMe && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                    <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('OTPScreen')}>
                    <Text style={styles.link}>Quên mật khẩu?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.primaryBtn, loading && styles.btnDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                  accessibilityRole="button"
                  accessibilityLabel="Đăng nhập"
                >
                  <Text style={styles.primaryBtnText}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer luôn ở cuối */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © {new Date().getFullYear()} PolyShine
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffefc' },
  content: { flex: 1, justifyContent: 'space-between' },
  top: { paddingHorizontal: 24, paddingTop: 28, alignItems: 'center' },
  middle: { flex: 1 },
  logoWrap: { marginBottom: 10 },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    elevation: 6,
  },
  logoLetter: { fontSize: 44, fontWeight: '900', color: '#ff7a18' },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  subtitle: { color: '#6b6b6b', marginTop: 6, textAlign: 'center' },

  form: { padding: 24, marginTop: 12 },
  label: { color: '#444', fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e9e6',
    shadowColor: '#000',
    shadowOpacity: 0.03,
  },
  pwdRow: { flexDirection: 'row', alignItems: 'center' },
  showBtn: { padding: 10, marginLeft: 8 },
  showBtnText: { color: '#ff7a18', fontWeight: '700' },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checked: { backgroundColor: '#ff7a18', borderColor: '#ff7a18' },
  checkMark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  rememberText: { color: '#666' },
  link: { color: '#ff7a18', fontWeight: '700' },

  primaryBtn: {
    marginTop: 18,
    backgroundColor: '#ff7a18',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.7 },
  primaryBtnText: { color: '#fff', fontWeight: '800' },

  rowCenter: { alignItems: 'center', marginTop: 14, marginBottom: 8 },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  socialBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  socialText: { color: '#333', fontWeight: '700' },

  signRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },

  footer: { alignItems: 'center', padding: 12, marginBottom: 6 },
  footerText: { color: '#aaa' },
});
