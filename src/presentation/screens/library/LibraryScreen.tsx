// Presentation Layer - Library Screen with Real Media Scanner

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@presentation/theme';
import { MediaType } from '@core/domain/entities/Media';
import { MediaScannerService, ScannedMedia } from '@infrastructure/media/MediaScannerService';
import { useNavigation } from '@react-navigation/native';

export const LibraryScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0, currentFile: '' });
  const [mediaItems, setMediaItems] = useState<ScannedMedia[]>([]);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    checkPermissionsAndScan();
  }, []);

  const checkPermissionsAndScan = async () => {
    const hasPerms = await MediaScannerService.checkPermissions();
    
    if (hasPerms) {
      setHasPermission(true);
      scanMedia();
    } else {
      requestPermissionAndScan();
    }
  };

  const requestPermissionAndScan = async () => {
    const granted = await MediaScannerService.requestPermissions();
    
    if (granted) {
      setHasPermission(true);
      scanMedia();
    } else {
      Alert.alert(
        'Permission Required',
        'Boulevard needs access to your media library to display your videos and music.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permission', onPress: requestPermissionAndScan },
        ]
      );
    }
  };

  const scanMedia = async () => {
    setIsScanning(true);
    setScanProgress({ current: 0, total: 0, currentFile: 'Starting scan...' });
    
    try {
      const media = await MediaScannerService.scanAllMedia((progress) => {
        setScanProgress(progress);
      });
      
      media.sort((a, b) => b.creationTime - a.creationTime);
      setMediaItems(media);
    } catch (error) {
      Alert.alert(
        'Scan Failed',
        error instanceof Error ? error.message : 'Failed to scan media files'
      );
    } finally {
      setIsScanning(false);
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'video' && item.mediaType === MediaType.VIDEO) ||
      (activeFilter === 'audio' && item.mediaType === MediaType.AUDIO);
    
    const matchesSearch = 
      item.filename.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const videoCount = mediaItems.filter(m => m.mediaType === MediaType.VIDEO).length;
  const audioCount = mediaItems.filter(m => m.mediaType === MediaType.AUDIO).length;

  const handleMediaPress = (item: ScannedMedia) => {
    if (item.mediaType === MediaType.VIDEO) {
      const title = item.filename.replace(/\.[^/.]+$/, '');
      
      // Cast navigation to 'any' once to bypass strict route checking
      (navigation as any).navigate('VideoPlayer', {
        mediaId: item.id,
        media: {
          id: item.id,
          title: title,
          uri: item.uri,
          duration: item.duration,
        },
      });
    } else {
      Alert.alert('Audio Player', 'Audio playback coming soon!');
    }
  };

  if (!hasPermission && !isScanning) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.colors.background.primary, theme.colors.background.secondary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionIcon}>🔒</Text>
          <Text style={styles.permissionTitle}>Permission Required</Text>
          <Text style={styles.permissionText}>
            Boulevard needs access to your media library to display your videos and music.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermissionAndScan}
          >
            <LinearGradient
              colors={[theme.colors.accent.primary, theme.colors.accent.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.permissionButtonGradient}
            >
              <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background.primary, theme.colors.background.secondary]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
        <TouchableOpacity onPress={scanMedia} style={styles.refreshButton} disabled={isScanning}>
          <Text style={styles.refreshIcon}>{isScanning ? '⏳' : '🔄'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search media..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            editable={!isScanning}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <FilterTab label="All" count={mediaItems.length} active={activeFilter === 'all'} onPress={() => setActiveFilter('all')} />
        <FilterTab label="Videos" count={videoCount} active={activeFilter === 'video'} onPress={() => setActiveFilter('video')} />
        <FilterTab label="Music" count={audioCount} active={activeFilter === 'audio'} onPress={() => setActiveFilter('audio')} />
      </View>

      {isScanning ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.accent.primary} />
          <Text style={styles.loadingText}>Scanning media files...</Text>
          {scanProgress.total > 0 && (
            <>
              <Text style={styles.loadingProgress}>{scanProgress.current} of {scanProgress.total}</Text>
              <Text style={styles.loadingFile} numberOfLines={1}>{scanProgress.currentFile}</Text>
            </>
          )}
        </View>
      ) : filteredMedia.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>{searchQuery ? '🔍' : mediaItems.length === 0 ? '📭' : '🎬'}</Text>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No matches found' : mediaItems.length === 0 ? 'No media found' : 'No media in this category'}
          </Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? 'Try a different search' : mediaItems.length === 0 ? 'Tap refresh to scan again' : 'Switch filters to see other media'}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>{filteredMedia.length} {filteredMedia.length === 1 ? 'file' : 'files'}</Text>
          </View>
          <FlatList
            data={filteredMedia}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <MediaCard item={item} index={index} onPress={() => handleMediaPress(item)} />
            )}
          />
        </>
      )}
    </View>
  );
};

const FilterTab: React.FC<{ label: string; count: number; active: boolean; onPress: () => void }> = ({ label, count, active, onPress }) => (
  <TouchableOpacity style={[styles.filterTab, active && styles.filterTabActive]} onPress={onPress}>
    <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{label}</Text>
    <View style={[styles.countBadge, active && styles.countBadgeActive]}>
      <Text style={[styles.countText, active && styles.countTextActive]}>{count}</Text>
    </View>
  </TouchableOpacity>
);

const MediaCard: React.FC<{ item: ScannedMedia; index: number; onPress: () => void }> = ({ item, index, onPress }) => {
  const isVideo = item.mediaType === MediaType.VIDEO;
  const duration = MediaScannerService.formatDuration(item.duration);
  const title = item.filename.replace(/\.[^/.]+$/, '');
  const resolution = isVideo ? MediaScannerService.getResolutionString(item.width, item.height) : undefined;
  
  return (
    <Animated.View entering={FadeInDown.delay(index * 30).duration(400)}>
      <TouchableOpacity style={styles.mediaCard} onPress={onPress}>
        <View style={styles.mediaCardLeft}>
          <View style={[styles.mediaIcon, { backgroundColor: isVideo ? theme.colors.accent.primary : theme.colors.accent.secondary }]}>
            <Text style={styles.mediaIconText}>{isVideo ? '🎬' : '🎵'}</Text>
          </View>
          <View style={styles.mediaInfo}>
            <Text style={styles.mediaTitle} numberOfLines={1}>{title}</Text>
            <View style={styles.mediaMetaRow}>
              <Text style={styles.mediaMeta}>{duration}</Text>
              {resolution && (<><Text style={styles.mediaDot}>•</Text><Text style={styles.mediaMeta}>{resolution}</Text></>)}
            </View>
          </View>
        </View>
        <View style={styles.playIndicator}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: theme.spacing.xl },
  permissionIcon: { fontSize: 80, marginBottom: theme.spacing.lg },
  permissionTitle: { fontFamily: theme.typography.fonts.display, fontSize: theme.typography.sizes['2xl'], color: theme.colors.text.primary, marginBottom: theme.spacing.md, textAlign: 'center' },
  permissionText: { fontFamily: theme.typography.fonts.body, fontSize: theme.typography.sizes.base, color: theme.colors.text.secondary, textAlign: 'center', lineHeight: 24, marginBottom: theme.spacing.xl },
  permissionButton: { width: '100%', borderRadius: theme.borderRadius.md, overflow: 'hidden' },
  permissionButtonGradient: { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl, alignItems: 'center' },
  permissionButtonText: { fontFamily: theme.typography.fonts.heading, fontSize: theme.typography.sizes.base, color: theme.colors.background.primary, fontWeight: '600' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: theme.spacing.base, paddingTop: 60, paddingBottom: theme.spacing.md },
  headerTitle: { fontFamily: theme.typography.fonts.display, fontSize: theme.typography.sizes['4xl'], color: theme.colors.text.primary, letterSpacing: 2 },
  refreshButton: { width: 44, height: 44, borderRadius: theme.borderRadius.md, backgroundColor: theme.colors.background.tertiary, alignItems: 'center', justifyContent: 'center' },
  refreshIcon: { fontSize: 20 },
  searchContainer: { paddingHorizontal: theme.spacing.base, marginBottom: theme.spacing.md },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.background.tertiary, borderRadius: theme.borderRadius.md, paddingHorizontal: theme.spacing.md, height: 48, borderWidth: 1, borderColor: theme.colors.glass.border },
  searchIcon: { fontSize: 18, marginRight: theme.spacing.sm },
  searchInput: { flex: 1, fontFamily: theme.typography.fonts.body, fontSize: theme.typography.sizes.base, color: theme.colors.text.primary },
  clearIcon: { fontSize: 18, color: theme.colors.text.tertiary },
  filterContainer: { flexDirection: 'row', paddingHorizontal: theme.spacing.base, marginBottom: theme.spacing.md, gap: theme.spacing.sm },
  filterTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, borderRadius: theme.borderRadius.md, backgroundColor: theme.colors.background.tertiary, borderWidth: 1, borderColor: 'transparent' },
  filterTabActive: { backgroundColor: theme.colors.interactive.hover, borderColor: theme.colors.accent.primary },
  filterLabel: { fontFamily: theme.typography.fonts.heading, fontSize: theme.typography.sizes.sm, color: theme.colors.text.secondary, marginRight: theme.spacing.xs },
  filterLabelActive: { color: theme.colors.accent.primary },
  countBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: theme.borderRadius.sm, backgroundColor: theme.colors.background.primary },
  countBadgeActive: { backgroundColor: theme.colors.accent.primary },
  countText: { fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.sizes.xs, color: theme.colors.text.tertiary },
  countTextActive: { color: theme.colors.background.primary },
  resultsHeader: { paddingHorizontal: theme.spacing.base, paddingBottom: theme.spacing.sm },
  resultsText: { fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.sizes.sm, color: theme.colors.text.tertiary },
  listContent: { paddingHorizontal: theme.spacing.base, paddingBottom: 100 },
  mediaCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.colors.background.tertiary, borderRadius: theme.borderRadius.md, padding: theme.spacing.md, marginBottom: theme.spacing.sm, borderWidth: 1, borderColor: theme.colors.glass.border },
  mediaCardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  mediaIcon: { width: 48, height: 48, borderRadius: theme.borderRadius.sm, alignItems: 'center', justifyContent: 'center', marginRight: theme.spacing.md },
  mediaIconText: { fontSize: 24 },
  mediaInfo: { flex: 1 },
  mediaTitle: { fontFamily: theme.typography.fonts.heading, fontSize: theme.typography.sizes.base, color: theme.colors.text.primary, marginBottom: 4 },
  mediaMetaRow: { flexDirection: 'row', alignItems: 'center' },
  mediaMeta: { fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.sizes.xs, color: theme.colors.text.tertiary },
  mediaDot: { marginHorizontal: theme.spacing.xs, color: theme.colors.text.tertiary },
  playIndicator: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.accent.primary, alignItems: 'center', justifyContent: 'center' },
  playIcon: { fontSize: 14, color: theme.colors.background.primary, marginLeft: 2 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.spacing.base },
  loadingText: { fontFamily: theme.typography.fonts.body, fontSize: theme.typography.sizes.base, color: theme.colors.text.secondary, marginTop: theme.spacing.md },
  loadingProgress: { fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.sizes.lg, color: theme.colors.accent.primary, marginTop: theme.spacing.sm },
  loadingFile: { fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.sizes.xs, color: theme.colors.text.tertiary, marginTop: theme.spacing.xs, maxWidth: '80%', textAlign: 'center' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.spacing.xl },
  emptyIcon: { fontSize: 64, marginBottom: theme.spacing.md },
  emptyText: { fontFamily: theme.typography.fonts.heading, fontSize: theme.typography.sizes.xl, color: theme.colors.text.primary, marginBottom: theme.spacing.sm },
  emptySubtext: { fontFamily: theme.typography.fonts.body, fontSize: theme.typography.sizes.base, color: theme.colors.text.tertiary, textAlign: 'center' },
});
