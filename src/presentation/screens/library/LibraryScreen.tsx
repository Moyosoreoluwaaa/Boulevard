// Presentation Layer - Library Screen
// Displays scanned media files with filtering and search

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@presentation/theme';
import { MediaType } from '@core/domain/entities/Media';

const { width } = Dimensions.get('window');

interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  duration: string;
  size: string;
  thumbnail?: string;
}

export const LibraryScreen = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    scanMedia();
  }, []);

  const scanMedia = async () => {
    setIsScanning(true);
    
    // Simulate media scanning (replace with real implementation)
    setTimeout(() => {
      const mockMedia: MediaItem[] = [
        {
          id: '1',
          title: 'Inception',
          type: MediaType.VIDEO,
          duration: '2:28:00',
          size: '2.4 GB',
        },
        {
          id: '2',
          title: 'Interstellar',
          type: MediaType.VIDEO,
          duration: '2:49:00',
          size: '3.1 GB',
        },
        {
          id: '3',
          title: 'The Dark Knight',
          type: MediaType.VIDEO,
          duration: '2:32:00',
          size: '2.8 GB',
        },
        {
          id: '4',
          title: 'Bohemian Rhapsody',
          type: MediaType.AUDIO,
          duration: '5:55',
          size: '8.2 MB',
        },
        {
          id: '5',
          title: 'Stairway to Heaven',
          type: MediaType.AUDIO,
          duration: '8:02',
          size: '11.4 MB',
        },
        {
          id: '6',
          title: 'Hotel California',
          type: MediaType.AUDIO,
          duration: '6:30',
          size: '9.1 MB',
        },
      ];
      
      setMediaItems(mockMedia);
      setIsScanning(false);
    }, 1500);
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'video' && item.type === MediaType.VIDEO) ||
      (activeFilter === 'audio' && item.type === MediaType.AUDIO);
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const videoCount = mediaItems.filter(m => m.type === MediaType.VIDEO).length;
  const audioCount = mediaItems.filter(m => m.type === MediaType.AUDIO).length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background.primary, theme.colors.background.secondary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
        <TouchableOpacity onPress={scanMedia} style={styles.refreshButton}>
          <Text style={styles.refreshIcon}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search media..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <FilterTab
          label="All"
          count={mediaItems.length}
          active={activeFilter === 'all'}
          onPress={() => setActiveFilter('all')}
        />
        <FilterTab
          label="Videos"
          count={videoCount}
          active={activeFilter === 'video'}
          onPress={() => setActiveFilter('video')}
        />
        <FilterTab
          label="Music"
          count={audioCount}
          active={activeFilter === 'audio'}
          onPress={() => setActiveFilter('audio')}
        />
      </View>

      {/* Media List */}
      {isScanning ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.accent.primary} />
          <Text style={styles.loadingText}>Scanning media files...</Text>
        </View>
      ) : filteredMedia.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No media found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? 'Try a different search' : 'Tap refresh to scan again'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMedia}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MediaCard item={item} index={index} />
          )}
        />
      )}
    </View>
  );
};

// Filter Tab Component
const FilterTab: React.FC<{
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
}> = ({ label, count, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.filterTab, active && styles.filterTabActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>
        {label}
      </Text>
      <View style={[styles.countBadge, active && styles.countBadgeActive]}>
        <Text style={[styles.countText, active && styles.countTextActive]}>
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Media Card Component
const MediaCard: React.FC<{
  item: MediaItem;
  index: number;
}> = ({ item, index }) => {
  const isVideo = item.type === MediaType.VIDEO;
  
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <TouchableOpacity style={styles.mediaCard}>
        <View style={styles.mediaCardLeft}>
          <View style={[
            styles.mediaIcon,
            { backgroundColor: isVideo ? theme.colors.accent.primary : theme.colors.accent.secondary }
          ]}>
            <Text style={styles.mediaIconText}>{isVideo ? '🎬' : '🎵'}</Text>
          </View>
          
          <View style={styles.mediaInfo}>
            <Text style={styles.mediaTitle} numberOfLines={1}>{item.title}</Text>
            <View style={styles.mediaMetaRow}>
              <Text style={styles.mediaMeta}>{item.duration}</Text>
              <Text style={styles.mediaDot}>•</Text>
              <Text style={styles.mediaMeta}>{item.size}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingTop: 60,
    paddingBottom: theme.spacing.md,
  },
  
  headerTitle: {
    fontFamily: theme.typography.fonts.display,
    fontSize: theme.typography.sizes['4xl'],
    color: theme.colors.text.primary,
    letterSpacing: 2,
  },
  
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  refreshIcon: {
    fontSize: 20,
  },
  
  // Search
  searchContainer: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.glass.border,
  },
  
  searchIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  
  searchInput: {
    flex: 1,
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
  },
  
  clearIcon: {
    fontSize: 18,
    color: theme.colors.text.tertiary,
  },
  
  // Filters
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.tertiary,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  filterTabActive: {
    backgroundColor: theme.colors.interactive.hover,
    borderColor: theme.colors.accent.primary,
  },
  
  filterLabel: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginRight: theme.spacing.xs,
  },
  
  filterLabelActive: {
    color: theme.colors.accent.primary,
  },
  
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background.primary,
  },
  
  countBadgeActive: {
    backgroundColor: theme.colors.accent.primary,
  },
  
  countText: {
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.tertiary,
  },
  
  countTextActive: {
    color: theme.colors.background.primary,
  },
  
  // Media List
  listContent: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: 100, // Space for tab bar
  },
  
  mediaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.glass.border,
  },
  
  mediaCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  mediaIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  
  mediaIconText: {
    fontSize: 24,
  },
  
  mediaInfo: {
    flex: 1,
  },
  
  mediaTitle: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  
  mediaMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  mediaMeta: {
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.tertiary,
  },
  
  mediaDot: {
    marginHorizontal: theme.spacing.xs,
    color: theme.colors.text.tertiary,
  },
  
  moreButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  moreIcon: {
    fontSize: 20,
    color: theme.colors.text.tertiary,
  },
  
  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingText: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  
  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  
  emptyText: {
    fontFamily: theme.typography.fonts.heading,
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  
  emptySubtext: {
    fontFamily: theme.typography.fonts.body,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
});
