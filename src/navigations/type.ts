import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

/**
 * Bottom tab routes
 */
export type BottomTabParamList = {
  HomeTab: undefined;
  ScheduleTab: undefined;
  ScanQRTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};

/**
 * Root stack routes
 */
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  OTPScreen: undefined;
  
  // Main App (Tab Navigator)
  MainTab: undefined;

  // Standalone Screens
  DashboardScreen: undefined; // Keeping this for reference or backward compat if needed, but likely replaced by HomeTab
  ScheduleScreen: { date?: string } | undefined;
  AppointmentScreen: undefined;
  AppointmentDetailScreen: { appointmentId: string };
  ProfileScreen: undefined;
  
  // New Screens
  ScanQRScreen: undefined;
  WaitingQueueScreen: undefined;
  LeaveRequestScreen: undefined;
  EarningsScreen: undefined;
  NotificationScreen: undefined;
};

export type TabScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;
