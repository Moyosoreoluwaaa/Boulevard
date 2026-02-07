// Presentation Layer - Settings Screen

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@presentation/theme';

export const SettingsScreen = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [downloadOnWifi, setDownloadOnWifi] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background.primary, theme.colors.background.secondary]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Playback Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <SectionHeader icon="⏯️" title="Playback" />
          <SettingItem
            label="Auto-play next"
            description="Automatically play next media in queue"
            value={autoPlay}
            onValueChange={setAutoPlay}
          />
          <SettingButton
            icon="🎵"
            label="Playback quality"
            value="High (1080p)"
            onPress={() => {}}
          />
          <SettingButton
            icon="🔊"
            label="Audio output"
            value="Speaker"
            onPress={() => {}}
          />
        </Animated.View>

        {/* Downloads Section */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <SectionHeader icon="📥" title="Downloads" />
          <SettingItem
            label="Download on WiFi only"
            description="Prevent cellular data usage"
            value={downloadOnWifi}
            onValueChange={setDownloadOnWifi}
          />
          <SettingButton
            icon="💾"
            label="Storage location"
            value="/storage/emulated/0/Boulevard"
            onPress={() => {}}
          />
          <SettingButton
            icon="🗑️"
            label="Clear cache"
            value="124 MB"
            onPress={() => {}}
          />
        </Animated.View>

        {/* Notifications Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <SectionHeader icon="🔔" title="Notifications" />
          <SettingItem
            label="Enable notifications"
            description="Get updates about downloads and playback"
            value={notifications}
            onValueChange={setNotifications}
          />
        </Animated.View>

        {/* About Section */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <SectionHeader icon="ℹ️" title="About" />
          <SettingButton
            icon="📱"
            label="App version"
            value="1.0.0"
            onPress={() => {}}
          />
          <SettingButton
            icon="📄"
            label="Privacy policy"
            value=""
            onPress={() => {}}
          />
          <SettingButton
            icon="⚖️"
            label="Terms of service"
            value=""
            onPress={() => {}}
          />
          <SettingButton
            icon="❤️"
            label="Rate Boulevard"
            value=""
            onPress={() => {}}
          />
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

// Section Header Component
const SectionHeader: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionIcon}>{icon}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// Setting Item with Toggle
const SettingItem: React.FC<{
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}> = ({ label, description, value, onValueChange }) => (
  <View style={styles.settingItem}>
    <View style={styles.settingTextContainer}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: theme.colors.background.tertiary,
        true: theme.colors.accent.primary,
      }}
      thumbColor={theme.colors.text.primary}
    />
  </View>
);

// Setting Button
const SettingButton: React.FC<{
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
}> = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={styles.settingButton} onPress={onPress}>
    <View style={styles.settingButtonLeft}>
      <Text style={styles.settingButtonIcon}>{icon}</Text>
      <Text style={styles.settingButtonLabel}>{label}</Text>
    </View>
    {value ? (
      <Text style={styles.settingButtonValue} numberOfLines={1}>{value}</Text>
    ) : (
      <Text style={styles.chevron}>›</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Header
  header: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
  },
  
  headerTitle: {
    fontFamily: theme.typography.fonts.display,
    fontSize: theme.typography.sizes['4xl'],
    color: theme.colors.text.primary,
    letterSpacing: 2,
  },
  
  // Section
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  
  sectionIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  
  sectionTitle: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text.secondary,
    letterSpacing: 0.5,
  },
  
  // Setting Item (with toggle)
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    marginHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.glass.border,
  },
  
  settingTextContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  
  settingLabel: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  
  settingDescription: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
  },
  
  // Setting Button
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    marginHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.glass.border,
  },
  
  settingButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  settingButtonIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  
  settingButtonLabel: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
  },
  
  settingButtonValue: {
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
    marginLeft: theme.spacing.md,
    maxWidth: 150,
  },
  
  chevron: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },
});
