import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

export default function ScanQRScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    setIsActive(isFocused);
  }, [isFocused]);

  const onCodeScanned = useCallback((codes) => {
    const value = codes[0]?.value;
    if (value) {
        setIsActive(false); // Stop scanning
        Alert.alert("QR Code Scanned", value, [
            { text: "OK", onPress: () => setIsActive(true) }
        ]);
    }
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  });

  if (!hasPermission) {
    return (
        <View style={styles.container}>
             <SafeAreaView style={styles.overlay}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Quét mã</Text>
                    <View style={{width: 30}} />
                </View>
                <View style={styles.centerContent}>
                    <Text style={styles.message}>Vui lòng cấp quyền truy cập camera</Text>
                    <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.button}>
                        <Text style={styles.buttonText}>Mở cài đặt</Text>
                    </TouchableOpacity>
                </View>
             </SafeAreaView>
        </View>
    );
  }

  if (device == null) {
    return (
        <View style={styles.container}>
             <SafeAreaView style={styles.overlay}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Quét mã</Text>
                    <View style={{width: 30}} />
                </View>
                <View style={styles.centerContent}>
                    <Text style={styles.message}>Không tìm thấy camera</Text>
                </View>
             </SafeAreaView>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
      />
      
      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Quét mã để Check-in</Text>
            <View style={{width: 30}} />
        </View>

        <View style={styles.scanFrameWrapper}>
            <View style={styles.scanFrame} />
            <Text style={styles.guideText}>Di chuyển camera đến mã QR</Text>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    overlay: { flex: 1, justifyContent: 'space-between', padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 },
    backBtn: { padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 },
    backText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    message: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
    button: { padding: 12, backgroundColor: '#fff', borderRadius: 8 },
    buttonText: { color: '#000', fontWeight: 'bold' },
    scanFrameWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scanFrame: { width: 250, height: 250, borderWidth: 2, borderColor: '#fff', backgroundColor: 'transparent', borderRadius: 16 },
    guideText: { color: '#fff', marginTop: 20, fontSize: 16, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 4 }
});
