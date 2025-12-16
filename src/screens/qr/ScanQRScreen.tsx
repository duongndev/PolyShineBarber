import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

/* -------------------- HEADER COMPONENT -------------------- */
const Header = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
      <Text style={styles.backText}>←</Text>
    </TouchableOpacity>
    <Text style={styles.title}>Quét mã QR</Text>
    <View style={styles.spacer} />
  </View>
);

/* -------------------- STATUS SCREEN COMPONENT -------------------- */
const StatusScreen = ({
  message,
  actionLabel,
  onAction,
  onBack,
}: {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onBack: () => void;
}) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.overlay}>
      <Header onBack={onBack} />
      <View style={styles.centerContent}>
        <Text style={styles.message}>{message}</Text>

        {actionLabel && onAction && (
          <TouchableOpacity onPress={onAction} style={styles.button}>
            <Text style={styles.buttonText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  </View>
);

/* --------------------- MAIN SCREEN ------------------------ */
export default function ScanQRScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [isActive, setIsActive] = useState(true);

  const frameSize = 260;
  const scanAnim = useRef(new Animated.Value(0)).current;

  /* ---- Hide/Show Tab Bar ---- */
  useEffect(() => {
    const parent = navigation.getParent?.() as any;
    parent?.setOptions({
      tabBarStyle: isFocused ? { display: 'none' } : undefined,
    });

    return () => parent?.setOptions({ tabBarStyle: undefined });
  }, [isFocused, navigation]);

  /* ---- Request Camera Permission ---- */
  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  /* ---- Activate Camera When Focused ---- */
  useEffect(() => {
    setIsActive(isFocused);
  }, [isFocused]);

  /* ---- Scan Animation ---- */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scanAnim]);

  /* ---- On QR Code Scanned ---- */
  const onCodeScanned = useCallback((codes: any[]) => {
    const value = codes[0]?.value;
    if (!value) return;

    setIsActive(false);
    Alert.alert('QR Code Scanned', value, [
      { text: 'OK', onPress: () => setIsActive(true) },
    ]);
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned,
  });

  const goBack = () =>
    navigation.getParent()?.navigate('MainTab') || navigation.goBack();

  /* -------------------- NO PERMISSION -------------------- */
  if (!hasPermission)
    return (
      <StatusScreen
        message="Vui lòng cấp quyền truy cập camera"
        actionLabel="Mở cài đặt"
        onAction={() => Linking.openSettings()}
        onBack={goBack}
      />
    );

  /* -------------------- NO CAMERA FOUND -------------------- */
  if (!device)
    return (
      <StatusScreen message="Không tìm thấy camera" onBack={goBack} />
    );

  /* -------------------- MAIN QR SCAN UI -------------------- */
return (
  <View style={styles.container}>
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
      codeScanner={codeScanner}
    />

    {/* HEADER FLOATING */}
    <View style={styles.headerWrapper}>
      <SafeAreaView>
        <View style={styles.headerGlass}>
          <TouchableOpacity onPress={goBack} style={styles.backCircle}>
            <Text style={styles.backSymbol}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Quét QR</Text>

          <View style={styles.spacerLg} />
        </View>
      </SafeAreaView>
    </View>

    {/* CONTENT */}
    <View style={styles.contentRoot}>
      {/* GLASS SCAN FRAME */}
      <View style={styles.scanFrameWrapper}>
        <View style={[styles.scanFrame, { width: frameSize, height: frameSize }]}>
          {/* Scan Line */}
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  {
                    translateY: scanAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, frameSize - 4],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>

      {/* GUIDE */}
      <View style={styles.guideWrapper}>
        <Text style={styles.guideLabel}>Đặt mã QR vào khu vực trên</Text>
      </View>
    </View>
  </View>
);


}

/* ----------------------- STYLES --------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  overlay: { flex: 1, padding: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 24,
  },
  backText: { color: '#fff', fontSize: 22, fontWeight: '700' },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  spacer: { width: 30 },
  spacerLg: { width: 40 },

  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buttonText: { color: '#000', fontWeight: '700' },

  contentArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  maskContainer: {
    width: '100%',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  maskFill: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  maskRow: { flexDirection: 'row' },

  cutout: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    position: 'relative',
  },

  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#ff7a18',
  },
  topLeft: {
    top: -1,
    left: -1,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: -1,
    right: -1,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },

  guideText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  headerWrapper: {
  ...StyleSheet.absoluteFillObject,
  position: 'absolute',
  top: 0,
  zIndex: 20,
},

headerGlass: {
  marginTop: 10,
  marginHorizontal: 16,
  padding: 12,
  borderRadius: 16,
  backgroundColor: 'rgba(255,255,255,0.12)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.2)',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

backCircle: {
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.4)',
},

backSymbol: {
  color: '#fff',
  fontSize: 22,
  fontWeight: '700',
},

headerTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
},


/* CONTENT ROOT */
contentRoot: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 60,
},


/* SCAN FRAME */
scanFrameWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
},

scanFrame: {
  borderRadius: 24,
  overflow: 'hidden',
  borderWidth: 3,
  borderColor: 'rgba(255,255,255,0.85)',
  backgroundColor: 'rgba(255,255,255,0.06)',
  shadowColor: '#000',
  shadowOpacity: 0.35,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
},


/* SCAN LINE */
scanLine: {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 4,
  borderRadius: 4,
  backgroundColor: '#ffcb4c',
  shadowColor: '#ffcb4c',
  shadowOpacity: 0.8,
  shadowRadius: 12,
},


/* GUIDE LABEL */
guideWrapper: {
  marginTop: 30,
  paddingHorizontal: 24,
  paddingVertical: 10,
  backgroundColor: 'rgba(0,0,0,0.45)',
  borderRadius: 12,
},

guideLabel: {
  color: '#fff',
  fontSize: 15,
  opacity: 0.9,
  textAlign: 'center',
},

  
});
