import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList, BottomTabParamList } from './type';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import AppointmentScreen from '../screens/appointment/AppointmentScreen';
import AppointmentDetailScreen from '../screens/appointment/AppointmentDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ScanQRScreen from '../screens/qr/ScanQRScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import WaitingQueueScreen from '../screens/queue/WaitingQueueScreen';
import EarningsScreen from '../screens/earnings/EarningsScreen';
import LeaveRequestScreen from '../screens/leave/LeaveRequestScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff7a18',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          backgroundColor: '#fff',
          borderTopColor: '#f0f0f0',
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'circle';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ScheduleTab') {
            iconName = focused ? 'calendar-month' : 'calendar-month-outline';
          } else if (route.name === 'NotificationsTab') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'account' : 'account-outline';
          }

          if (route.name === 'ScanQRTab') {
            return null; // Handled in specific screen options
          }

          return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={DashboardScreen} 
        options={{ 
          title: 'Trang chủ',
        }} 
      />
      <Tab.Screen 
        name="ScheduleTab" 
        component={ScheduleScreen} 
        options={{ 
          title: 'Lịch',
        }} 
      />
      <Tab.Screen 
        name="ScanQRTab" 
        component={ScanQRScreen} 
        options={{
          title: '',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <View style={{
                width: 64, 
                height: 64, 
                backgroundColor: '#ff7a18', 
                borderRadius: 32, 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: Platform.OS === 'ios' ? 30 : 40,
                elevation: 8,
                shadowColor: '#ff7a18',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.4,
                shadowRadius: 6,
                borderWidth: 4,
                borderColor: '#f5f5f5'
            }}>
                <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="NotificationsTab" 
        component={NotificationScreen} 
        options={{ 
          title: 'Thông báo',
        }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ 
          title: 'Hồ sơ',
        }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#ff7a18',
        }}
      >
        {/* Auth */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Đăng nhập', headerShown: false }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ title: 'Xác thực OTP' }} />

        {/* Main App */}
        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />

        {/* Detail Screens */}
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} options={{ title: 'Đặt lịch' }} />
        <Stack.Screen name="AppointmentDetailScreen" component={AppointmentDetailScreen} options={{ title: 'Chi tiết lịch hẹn' }} />
        <Stack.Screen name="WaitingQueueScreen" component={WaitingQueueScreen} options={{ title: 'Khách đang chờ' }} />
        <Stack.Screen name="LeaveRequestScreen" component={LeaveRequestScreen} options={{ title: 'Nghỉ & Tăng ca' }} />
        <Stack.Screen name="EarningsScreen" component={EarningsScreen} options={{ title: 'Thu nhập' }} />
        <Stack.Screen name="ScanQRScreen" component={ScanQRScreen} options={{ title: 'Quét QR' }} />
        
        {/* Fallback/Legacy references if needed by other components */}
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ title: 'Tổng quan' }} />
        <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{ title: 'Lịch làm việc' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Hồ sơ' }} />
      </Stack.Navigator>
  );
}
