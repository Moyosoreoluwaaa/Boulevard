// Core Utilities - Result Type for Error Handling
// Inspired by Rust's Result<T, E> and functional programming

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Factory functions for creating Results
export const success = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

export const failure = <E = Error>(error: E): Result<never, E> => ({
  success: false,
  error,
});

// Helper functions for working with Results
export const isSuccess = <T, E>(result: Result<T, E>): result is { success: true; data: T } => {
  return result.success;
};

export const isFailure = <T, E>(result: Result<T, E>): result is { success: false; error: E } => {
  return !result.success;
};

// Map: Transform the data inside a successful Result
export const map = <T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => U
): Result<U, E> => {
  if (result.success) {
    return success(fn(result.data));
  }
  return result;
};

// MapError: Transform the error inside a failed Result
export const mapError = <T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> => {
  if (!result.success) {
    return failure(fn(result.error));
  }
  return result;
};

// FlatMap (bind): Chain operations that return Results
export const flatMap = <T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => Result<U, E>
): Result<U, E> => {
  if (result.success) {
    return fn(result.data);
  }
  return result;
};

// GetOrElse: Extract data or return a default value
export const getOrElse = <T, E>(result: Result<T, E>, defaultValue: T): T => {
  if (result.success) {
    return result.data;
  }
  return defaultValue;
};

// GetOrThrow: Extract data or throw the error
export const getOrThrow = <T, E>(result: Result<T, E>): T => {
  if (result.success) {
    return result.data;
  }
  throw result.error;
};

// Unwrap: Extract data or return null
export const unwrap = <T, E>(result: Result<T, E>): T | null => {
  if (result.success) {
    return result.data;
  }
  return null;
};

// Match: Pattern matching for Results
export const match = <T, E, U>(
  result: Result<T, E>,
  handlers: {
    success: (data: T) => U;
    failure: (error: E) => U;
  }
): U => {
  if (result.success) {
    return handlers.success(result.data);
  }
  return handlers.failure(result.error);
};

// Combine multiple Results into one
export const combine = <T extends readonly unknown[], E>(
  results: { [K in keyof T]: Result<T[K], E> }
): Result<T, E> => {
  const values: unknown[] = [];
  
  for (const result of results) {
    if (!result.success) {
      return result;
    }
    values.push(result.data);
  }
  
  return success(values as unknown as T);
};

// Async helpers
export const wrapAsync = async <T>(
  promise: Promise<T>
): Promise<Result<T, Error>> => {
  try {
    const data = await promise;
    return success(data);
  } catch (error) {
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
};

// Domain-specific error types
export class MediaNotFoundError extends Error {
  constructor(mediaId: string) {
    super(`Media with id ${mediaId} not found`);
    this.name = 'MediaNotFoundError';
  }
}

export class PlaylistNotFoundError extends Error {
  constructor(playlistId: string) {
    super(`Playlist with id ${playlistId} not found`);
    this.name = 'PlaylistNotFoundError';
  }
}

export class StorageError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class PlaybackError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'PlaybackError';
  }
}

export class PermissionError extends Error {
  constructor(permission: string) {
    super(`Permission denied: ${permission}`);
    this.name = 'PermissionError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}
