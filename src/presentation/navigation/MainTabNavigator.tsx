// Presentation Layer - Bottom Tab Navigator
// Boulevard's main navigation with distinctive tab bar design

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { theme } from '@presentation/theme';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LibraryScreen } from '../screens/library/LibraryScreen';
import { PlayerScreen } from '../screens/player/PlayerScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

// Custom Tab Bar Icons
const TabIcon: React.FC<{
  focused: boolean;
  icon: string;
  label: string;
}> = ({ focused, icon, label }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(focused ? 1.2 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  return (
    <View style={styles.tabIconContainer}>
      <Animated.View style={[styles.iconWrapper, animatedStyle]}>
        <View
          style={[
            styles.iconBackground,
            focused && styles.iconBackgroundActive,
          ]}
        >
          <Animated.Text
            style={[
              styles.iconText,
              { color: focused ? theme.colors.accent.primary : theme.colors.text.tertiary },
            ]}
          >
            {icon}
          </Animated.Text>
        </View>
      </Animated.View>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
};

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.accent.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="🏠" label="Home" />
          ),
        }}
      />
      
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="📁" label="Library" />
          ),
        }}
      />
      
      <Tab.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="▶️" label="Player" />
          ),
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="⚙️" label="Settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.glass.border,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    ...theme.shadows.xl,
  },
  
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  
  iconBackgroundActive: {
    backgroundColor: theme.colors.interactive.hover,
  },
  
  iconText: {
    fontSize: 24,
  },
  
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 32,
    height: 3,
    backgroundColor: theme.colors.accent.primary,
    borderRadius: theme.borderRadius.full,
  },
});
