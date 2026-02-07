// Core Domain Layer - Pure TypeScript Entities
// No dependencies on React Native or external libraries

export interface Media {
  id: string;
  title: string;
  type: MediaType;
  uri: string;
  duration: number; // in seconds
  size: number; // in bytes
  createdAt: Date;
  updatedAt: Date;
  thumbnailUri?: string;
  isFavorite: boolean;
}

export enum MediaType {
  VIDEO = 'video',
  AUDIO = 'audio',
}

export interface AudioTrack extends Media {
  type: MediaType.AUDIO;
  artist?: string;
  album?: string;
  genre?: string;
  year?: number;
}

export interface VideoFile extends Media {
  type: MediaType.VIDEO;
  resolution?: string;
  fps?: number;
  codec?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  mediaIds: string[];
  thumbnailUri?: string;
  createdAt: Date;
  updatedAt: Date;
  isSystem: boolean; // for default playlists like "Recently Played"
}

export interface PlaybackState {
  mediaId: string | null;
  isPlaying: boolean;
  position: number; // current position in seconds
  duration: number;
  volume: number; // 0.0 to 1.0
  isMuted: boolean;
  playbackRate: number; // 0.5, 1.0, 1.5, 2.0, etc.
  repeat: RepeatMode;
  shuffle: boolean;
}

export enum RepeatMode {
  OFF = 'off',
  ONE = 'one',
  ALL = 'all',
}

export interface MediaFilter {
  type?: MediaType;
  searchQuery?: string;
  sortBy: SortOption;
  sortOrder: SortOrder;
}

export enum SortOption {
  TITLE = 'title',
  DATE_ADDED = 'dateAdded',
  DURATION = 'duration',
  SIZE = 'size',
  ARTIST = 'artist',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface DownloadTask {
  id: string;
  mediaId: string;
  url: string;
  destination: string;
  progress: number; // 0 to 100
  status: DownloadStatus;
  bytesDownloaded: number;
  totalBytes: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export enum DownloadStatus {
  PENDING = 'pending',
  DOWNLOADING = 'downloading',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// Value Objects
export interface MediaMetadata {
  title: string;
  artist?: string;
  album?: string;
  year?: number;
  genre?: string;
  duration: number;
  thumbnailData?: string; // base64
}

export interface TimeRange {
  start: number;
  end: number;
}

// Domain Events
export interface DomainEvent {
  id: string;
  occurredAt: Date;
}

export interface MediaAddedEvent extends DomainEvent {
  type: 'MediaAdded';
  media: Media;
}

export interface PlaybackStartedEvent extends DomainEvent {
  type: 'PlaybackStarted';
  mediaId: string;
}

export interface PlaybackPausedEvent extends DomainEvent {
  type: 'PlaybackPaused';
  mediaId: string;
  position: number;
}

export interface PlaybackCompletedEvent extends DomainEvent {
  type: 'PlaybackCompleted';
  mediaId: string;
}