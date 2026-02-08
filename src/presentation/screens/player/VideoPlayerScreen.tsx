// Presentation Layer - Video Player Screen
// Full-screen video playback with custom controls

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import { useRoute, useNavigation } from '@react-navigation/native';
import { theme } from '@presentation/theme';
import { MediaScannerService } from '@infrastructure/media/MediaScannerService';

const { width, height } = Dimensions.get('window');

interface PlayerParams {
  mediaId: string;
  media: {
    id: string;
    title: string;
    uri: string;
    duration: number;
  };
}

export const VideoPlayerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as PlayerParams;
  
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(params.media.duration * 1000 || 0);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  
  const controlsOpacity = useSharedValue(1);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hide status bar
    StatusBar.setHidden(true);
    
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  useEffect(() => {
    if (showControls) {
      controlsOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      
      // Auto-hide controls after 3 seconds
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      controlsTimeout.current = setTimeout(() => {
        if (isPlaying) {
          hideControls();
        }
      }, 3000);
    } else {
      controlsOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [showControls, isPlaying]);

  const controlsStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  const hideControls = () => {
    setShowControls(false);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current?.playAsync();
      setIsPlaying(true);
    }
  };

  const handleSeek = async (value: number) => {
    await videoRef.current?.setPositionAsync(value);
    setPosition(value);
  };

  const handleForward = async () => {
    const newPosition = Math.min(position + 10000, duration);
    await handleSeek(newPosition);
  };

  const handleRewind = async () => {
    const newPosition = Math.max(position - 10000, 0);
    await handleSeek(newPosition);
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status);
    
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);
      
      // Auto-close when video ends
      if (status.didJustFinish) {
        navigation.goBack();
      }
    }
  };

  const formatTime = (millis: number) => {
    return MediaScannerService.formatDuration(millis / 1000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Video Player */}
      <TouchableWithoutFeedback onPress={toggleControls}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: params.media.uri }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
          
          {/* Buffering Indicator */}
          {isBuffering && (
            <View style={styles.bufferingContainer}>
              <View style={styles.bufferingSpinner}>
                <Text style={styles.bufferingText}>⏳</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Controls Overlay */}
      {showControls && (
        <Animated.View style={[styles.controlsOverlay, controlsStyle]}>
          {/* Top Bar */}
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.topGradient}
          >
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backIcon}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.titleText} numberOfLines={1}>
                {params.media.title}
              </Text>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreIcon}>⋮</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Center Controls */}
          <View style={styles.centerControls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleRewind}>
              <View style={styles.controlButtonInner}>
                <Text style={styles.controlIcon}>⏪</Text>
                <Text style={styles.controlLabel}>10s</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.playButton]}
              onPress={handlePlayPause}
            >
              <View style={styles.playButtonInner}>
                <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶️'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={handleForward}>
              <View style={styles.controlButtonInner}>
                <Text style={styles.controlIcon}>⏩</Text>
                <Text style={styles.controlLabel}>10s</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Bottom Bar */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.bottomGradient}
          >
            <View style={styles.bottomBar}>
              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={duration}
                  value={position}
                  onSlidingComplete={handleSeek}
                  minimumTrackTintColor={theme.colors.accent.primary}
                  maximumTrackTintColor={theme.colors.player.progressTrack}
                  thumbTintColor={theme.colors.accent.primary}
                />
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>

              {/* Additional Controls */}
              <View style={styles.bottomControls}>
                <TouchableOpacity style={styles.smallButton}>
                  <Text style={styles.smallIcon}>🔊</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton}>
                  <Text style={styles.smallIcon}>⚙️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton}>
                  <Text style={styles.smallIcon}>⛶</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  video: {
    width,
    height,
  },
  
  // Buffering
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  
  bufferingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  bufferingText: {
    fontSize: 32,
  },
  
  // Controls Overlay
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  
  // Top Bar
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: theme.spacing.base,
  },
  
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  backIcon: {
    fontSize: 32,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
  
  titleText: {
    flex: 1,
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text.primary,
  },
  
  moreButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  moreIcon: {
    fontSize: 24,
    color: theme.colors.text.primary,
  },
  
  // Center Controls
  centerControls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  
  controlButton: {
    alignItems: 'center',
  },
  
  controlButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  controlIcon: {
    fontSize: 28,
  },
  
  controlLabel: {
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  
  playButton: {},
  
  playButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.accent.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  playIcon: {
    fontSize: 36,
  },
  
  // Bottom Bar
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.base,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  
  slider: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
  },
  
  timeText: {
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
    minWidth: 50,
    textAlign: 'center',
  },
  
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
  },
  
  smallButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  smallIcon: {
    fontSize: 20,
  },
});
