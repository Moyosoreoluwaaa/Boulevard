// Infrastructure Layer - Media Scanner Service
// Scans device storage for video and audio files

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { MediaType } from '@core/domain/entities/Media';

export interface ScannedMedia {
  id: string;
  filename: string;
  uri: string;
  mediaType: MediaType;
  duration: number;
  creationTime: number;
  modificationTime: number;
  width?: number;
  height?: number;
  albumId?: string;
}

export interface ScanProgress {
  current: number;
  total: number;
  currentFile: string;
}

export class MediaScannerService {
  private static readonly SUPPORTED_VIDEO_EXTENSIONS = [
    '.mp4', '.mkv', '.avi', '.mov', '.m4v', '.3gp', '.webm', '.flv', '.wmv'
  ];
  
  private static readonly SUPPORTED_AUDIO_EXTENSIONS = [
    '.mp3', '.m4a', '.wav', '.flac', '.aac', '.ogg', '.wma', '.opus'
  ];

  /**
   * Request permissions to access media library
   */
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  /**
   * Check if permissions are granted
   */
  static async checkPermissions(): Promise<boolean> {
    try {
      const { status } = await MediaLibrary.getPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Permission check failed:', error);
      return false;
    }
  }

  /**
   * Scan device for all media files
   */
  static async scanAllMedia(
    onProgress?: (progress: ScanProgress) => void
  ): Promise<ScannedMedia[]> {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) {
      const granted = await this.requestPermissions();
      if (!granted) {
        throw new Error('Media library permission denied');
      }
    }

    const allMedia: ScannedMedia[] = [];

    // Scan videos
    const videos = await this.scanVideos(onProgress);
    allMedia.push(...videos);

    // Scan audio
    const audio = await this.scanAudio(onProgress);
    allMedia.push(...audio);

    return allMedia;
  }

  /**
   * Scan for video files
   */
  static async scanVideos(
    onProgress?: (progress: ScanProgress) => void
  ): Promise<ScannedMedia[]> {
    try {
      const videos: ScannedMedia[] = [];
      let hasNextPage = true;
      let endCursor: string | undefined;

      while (hasNextPage) {
        const result = await MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.video,
          first: 100,
          after: endCursor,
          sortBy: MediaLibrary.SortBy.creationTime,
        });

        for (let i = 0; i < result.assets.length; i++) {
          const asset = result.assets[i];
          
          // Call progress callback
          if (onProgress) {
            onProgress({
              current: videos.length + i + 1,
              total: result.totalCount,
              currentFile: asset.filename,
            });
          }

          const scannedMedia: ScannedMedia = {
            id: asset.id,
            filename: asset.filename,
            uri: asset.uri,
            mediaType: MediaType.VIDEO,
            duration: asset.duration,
            creationTime: asset.creationTime || 0,
            modificationTime: asset.modificationTime || 0,
            width: asset.width,
            height: asset.height,
            albumId: asset.albumId,
          };

          videos.push(scannedMedia);
        }

        hasNextPage = result.hasNextPage;
        endCursor = result.endCursor;
      }

      return videos;
    } catch (error) {
      console.error('Video scan failed:', error);
      return [];
    }
  }

  /**
   * Scan for audio files
   */
  static async scanAudio(
    onProgress?: (progress: ScanProgress) => void
  ): Promise<ScannedMedia[]> {
    try {
      const audioFiles: ScannedMedia[] = [];
      let hasNextPage = true;
      let endCursor: string | undefined;

      while (hasNextPage) {
        const result = await MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.audio,
          first: 100,
          after: endCursor,
          sortBy: MediaLibrary.SortBy.creationTime,
        });

        for (let i = 0; i < result.assets.length; i++) {
          const asset = result.assets[i];
          
          // Call progress callback
          if (onProgress) {
            onProgress({
              current: audioFiles.length + i + 1,
              total: result.totalCount,
              currentFile: asset.filename,
            });
          }

          const scannedMedia: ScannedMedia = {
            id: asset.id,
            filename: asset.filename,
            uri: asset.uri,
            mediaType: MediaType.AUDIO,
            duration: asset.duration,
            creationTime: asset.creationTime || 0,
            modificationTime: asset.modificationTime || 0,
            albumId: asset.albumId,
          };

          audioFiles.push(scannedMedia);
        }

        hasNextPage = result.hasNextPage;
        endCursor = result.endCursor;
      }

      return audioFiles;
    } catch (error) {
      console.error('Audio scan failed:', error);
      return [];
    }
  }

  /**
   * Get asset info by ID
   */
  static async getAssetInfo(assetId: string): Promise<MediaLibrary.Asset | null> {
    try {
      const asset = await MediaLibrary.getAssetInfoAsync(assetId);
      return asset;
    } catch (error) {
      console.error('Failed to get asset info:', error);
      return null;
    }
  }

  /**
   * Create album for organizing media
   */
  static async createAlbum(albumName: string): Promise<string | null> {
    try {
      const album = await MediaLibrary.createAlbumAsync(albumName, undefined, false);
      return album.id;
    } catch (error) {
      console.error('Failed to create album:', error);
      return null;
    }
  }

  /**
   * Get albums
   */
  static async getAlbums(): Promise<MediaLibrary.Album[]> {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();
      return albums;
    } catch (error) {
      console.error('Failed to get albums:', error);
      return [];
    }
  }

  /**
   * Format duration to human-readable string
   */
  static formatDuration(seconds: number): string {
    if (seconds < 60) {
      return `0:${seconds.toString().padStart(2, '0')}`;
    }
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Format file size to human-readable string
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  }

  /**
   * Extract file extension
   */
  static getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1) return '';
    return filename.substring(lastDot).toLowerCase();
  }

  /**
   * Check if file is supported video
   */
  static isSupportedVideo(filename: string): boolean {
    const ext = this.getFileExtension(filename);
    return this.SUPPORTED_VIDEO_EXTENSIONS.includes(ext);
  }

  /**
   * Check if file is supported audio
   */
  static isSupportedAudio(filename: string): boolean {
    const ext = this.getFileExtension(filename);
    return this.SUPPORTED_AUDIO_EXTENSIONS.includes(ext);
  }

  /**
   * Get video resolution string
   */
  static getResolutionString(width?: number, height?: number): string {
    if (!width || !height) return 'Unknown';
    
    if (height >= 2160) return '4K UHD';
    if (height >= 1440) return '2K QHD';
    if (height >= 1080) return 'Full HD';
    if (height >= 720) return 'HD';
    if (height >= 480) return 'SD';
    return `${width}x${height}`;
  }
}
