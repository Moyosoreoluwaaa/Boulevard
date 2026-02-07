import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@presentation/theme';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  // Animated glow effect for logo
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(0.4, { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background gradient */}
      <LinearGradient
        colors={[theme.colors.background.primary, theme.colors.background.secondary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Animated background glow */}
      <Animated.View style={[styles.backgroundGlow, glowStyle]} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.hero}>
          {/* Logo with glow effect */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[theme.colors.accent.primary, theme.colors.accent.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <Text style={styles.logoText}>B</Text>
            </LinearGradient>
            <View style={[styles.logoGlow, { backgroundColor: theme.colors.accent.primary }]} />
          </View>

          <Text style={styles.appName}>BOULEVARD</Text>
          <Text style={styles.tagline}>Your Cinematic Media Experience</Text>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInRight.delay(200).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              icon="🎬"
              title="Videos"
              subtitle="24 files"
              gradient={[theme.colors.accent.primary, '#0080FF']}
              delay={300}
            />
            <QuickActionCard
              icon="🎵"
              title="Music"
              subtitle="156 tracks"
              gradient={[theme.colors.accent.secondary, '#FF8800']}
              delay={400}
            />
            <QuickActionCard
              icon="⭐"
              title="Favorites"
              subtitle="12 items"
              gradient={[theme.colors.accent.tertiary, '#CC0055']}
              delay={500}
            />
            <QuickActionCard
              icon="🕒"
              title="Recent"
              subtitle="8 items"
              gradient={[theme.colors.accent.success, '#00CC77']}
              delay={600}
            />
          </View>
        </Animated.View>

        {/* Continue Watching */}
        <Animated.View entering={FadeInRight.delay(400).duration(600)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Watching</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            <MediaCard
              title="Inception"
              progress={0.65}
              duration="2:28:00"
              thumbnail="🎬"
            />
            <MediaCard
              title="Interstellar"
              progress={0.32}
              duration="2:49:00"
              thumbnail="🌌"
            />
            <MediaCard
              title="The Dark Knight"
              progress={0.89}
              duration="2:32:00"
              thumbnail="🦇"
            />
          </ScrollView>
        </Animated.View>

        {/* Playlists */}
        <Animated.View entering={FadeInRight.delay(600).duration(600)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Playlists</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>+ New</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.playlistsContainer}>
            <PlaylistCard title="Road Trip Mix" count={24} color={theme.colors.accent.primary} />
            <PlaylistCard title="Workout Energy" count={32} color={theme.colors.accent.secondary} />
            <PlaylistCard title="Late Night Vibes" count={18} color={theme.colors.accent.tertiary} />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// Quick Action Card Component
const QuickActionCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  gradient: string[];
  delay: number;
}> = ({ icon, title, subtitle, gradient, delay }) => {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(600)}>
      <TouchableOpacity style={styles.quickActionCard}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.quickActionGradient}
        >
          <BlurView intensity={20} tint="dark" style={styles.quickActionBlur}>
            <Text style={styles.quickActionIcon}>{icon}</Text>
            <Text style={styles.quickActionTitle}>{title}</Text>
            <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
          </BlurView>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Media Card Component
const MediaCard: React.FC<{
  title: string;
  progress: number;
  duration: string;
  thumbnail: string;
}> = ({ title, progress, duration, thumbnail }) => {
  return (
    <TouchableOpacity style={styles.mediaCard}>
      <View style={styles.mediaThumbnail}>
        <Text style={styles.thumbnailEmoji}>{thumbnail}</Text>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.mediaGradientOverlay}
        />
        <View style={styles.mediaDuration}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>
      
      <View style={styles.mediaInfo}>
        <Text style={styles.mediaTitle} numberOfLines={2}>{title}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Playlist Card Component
const PlaylistCard: React.FC<{
  title: string;
  count: number;
  color: string;
}> = ({ title, count, color }) => {
  return (
    <TouchableOpacity style={styles.playlistCard}>
      <View style={[styles.playlistColorBar, { backgroundColor: color }]} />
      <View style={styles.playlistContent}>
        <Text style={styles.playlistTitle}>{title}</Text>
        <Text style={styles.playlistCount}>{count} tracks</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  
  backgroundGlow: {
    position: 'absolute',
    top: -200,
    left: -100,
    width: 400,
    height: 400,
    backgroundColor: theme.colors.accent.primary,
    borderRadius: 200,
    opacity: 0.1,
    blur: 100,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Hero Section
  hero: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: theme.spacing.base,
  },
  
  logoContainer: {
    position: 'relative',
    marginBottom: theme.spacing.lg,
  },
  
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.xl,
  },
  
  logoGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 24,
    opacity: 0.3,
    blur: 20,
  },
  
  logoText: {
    fontFamily: theme.typography.fonts.display,
    fontSize: 48,
    color: theme.colors.background.primary,
    fontWeight: 'bold',
  },
  
  appName: {
    fontFamily: theme.typography.fonts.display,
    fontSize: theme.typography.sizes['4xl'],
    color: theme.colors.text.primary,
    letterSpacing: 4,
    marginBottom: theme.spacing.xs,
  },
  
  tagline: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.tertiary,
    letterSpacing: 1,
  },
  
  // Sections
  section: {
    marginBottom: theme.spacing.xl,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  
  sectionTitle: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.text.primary,
    letterSpacing: 0.5,
  },
  
  seeAll: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.accent.primary,
  },
  
  // Quick Actions Grid
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.md,
  },
  
  quickActionCard: {
    width: (width - theme.spacing.base * 2 - theme.spacing.md) / 2,
    height: 120,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  
  quickActionGradient: {
    flex: 1,
  },
  
  quickActionBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 15, 0.3)',
  },
  
  quickActionIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  
  quickActionTitle: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  
  quickActionSubtitle: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.tertiary,
  },
  
  // Media Cards
  horizontalScroll: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.md,
  },
  
  mediaCard: {
    width: 200,
    marginRight: theme.spacing.md,
  },
  
  mediaThumbnail: {
    width: 200,
    height: 112,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  
  thumbnailEmoji: {
    fontSize: 48,
  },
  
  mediaGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  
  mediaDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  durationText: {
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.primary,
  },
  
  mediaInfo: {
    paddingHorizontal: 4,
  },
  
  mediaTitle: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: theme.colors.player.progressTrack,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent.primary,
  },
  
  progressText: {
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.tertiary,
    width: 35,
  },
  
  // Playlists
  playlistsContainer: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  
  playlistCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  
  playlistColorBar: {
    width: 4,
  },
  
  playlistContent: {
    flex: 1,
    padding: theme.spacing.md,
  },
  
  playlistTitle: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  
  playlistCount: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
  },
});
