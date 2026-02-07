// Core Domain Layer - Use Case: Get Media List
// Business logic for retrieving and filtering media

import { injectable, inject } from 'tsyringe';
import { Media, MediaFilter, MediaType } from '../entities/Media';
import { IMediaRepository } from '../repositories/IMediaRepository';
import { Result, success, failure } from '../../utils/Result';

export interface GetMediaListParams {
  filter?: MediaFilter;
  type?: MediaType;
  favoritesOnly?: boolean;
}

@injectable()
export class GetMediaList {
  constructor(
    @inject('IMediaRepository') private readonly mediaRepository: IMediaRepository
  ) {}

  async execute(params?: GetMediaListParams): Promise<Result<Media[]>> {
    try {
      let result: Result<Media[]>;

      // Get favorites only
      if (params?.favoritesOnly) {
        result = await this.mediaRepository.getFavorites();
        if (!result.success) return result;
        
        // Apply additional filters if provided
        if (params.type) {
          const filtered = result.data.filter(m => m.type === params.type);
          return success(filtered);
        }
        
        return result;
      }

      // Get by type
      if (params?.type) {
        result = await this.mediaRepository.getByType(params.type);
        if (!result.success) return result;
        
        // Apply filter if provided
        if (params.filter) {
          return this.applyFilter(result.data, params.filter);
        }
        
        return result;
      }

      // Get with filter
      if (params?.filter) {
        result = await this.mediaRepository.filter(params.filter);
        return result;
      }

      // Get all
      result = await this.mediaRepository.getAll();
      return result;
      
    } catch (error) {
      return failure(
        error instanceof Error ? error : new Error('Failed to get media list')
      );
    }
  }

  private applyFilter(media: Media[], filter: MediaFilter): Result<Media[]> {
    try {
      let filtered = [...media];

      // Apply search query
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        filtered = filtered.filter(m =>
          m.title.toLowerCase().includes(query) ||
          ('artist' in m && m.artist?.toLowerCase().includes(query)) ||
          ('album' in m && m.album?.toLowerCase().includes(query))
        );
      }

      // Sort
      filtered.sort((a, b) => {
        const order = filter.sortOrder === 'asc' ? 1 : -1;
        
        switch (filter.sortBy) {
          case 'title':
            return a.title.localeCompare(b.title) * order;
          case 'dateAdded':
            return (a.createdAt.getTime() - b.createdAt.getTime()) * order;
          case 'duration':
            return (a.duration - b.duration) * order;
          case 'size':
            return (a.size - b.size) * order;
          case 'artist':
            if ('artist' in a && 'artist' in b) {
              const artistA = a.artist || '';
              const artistB = b.artist || '';
              return artistA.localeCompare(artistB) * order;
            }
            return 0;
          default:
            return 0;
        }
      });

      return success(filtered);
    } catch (error) {
      return failure(
        error instanceof Error ? error : new Error('Failed to apply filter')
      );
    }
  }
}
