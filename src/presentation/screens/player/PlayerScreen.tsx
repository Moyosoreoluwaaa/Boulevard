// Presentation Layer - Player Screen (Placeholder)
// Will be implemented in Phase 3

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@presentation/theme';

export const PlayerScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background.primary, theme.colors.background.secondary]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.placeholderContainer}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[theme.colors.accent.primary, theme.colors.accent.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <Text style={styles.icon}>▶️</Text>
            </LinearGradient>
          </View>
          
          <Text style={styles.title}>Media Player</Text>
          <Text style={styles.subtitle}>Coming in Phase 3</Text>
          
          <View style={styles.featuresList}>
            <FeatureItem icon="🎬" text="Full-screen video playback" />
            <FeatureItem icon="🎵" text="Background audio playback" />
            <FeatureItem icon="⏯️" text="Play/Pause/Seek controls" />
            <FeatureItem icon="🔊" text="Volume & brightness gestures" />
            <FeatureItem icon="📺" text="Picture-in-Picture mode" />
            <FeatureItem icon="⏭️" text="Playlist queue management" />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
  },
  
  placeholderContainer: {
    alignItems: 'center',
    width: '100%',
  },
  
  iconContainer: {
    marginBottom: theme.spacing.xl,
  },
  
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.xl,
  },
  
  icon: {
    fontSize: 56,
  },
  
  title: {
    fontFamily: theme.typography.fonts.display,
    fontSize: theme.typography.sizes['3xl'],
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    letterSpacing: 2,
  },
  
  subtitle: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.xl,
  },
  
  featuresList: {
    width: '100%',
    gap: theme.spacing.md,
  },
  
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.glass.border,
  },
  
  featureIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  
  featureText: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.secondary,
    flex: 1,
  },
});
