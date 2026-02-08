# Boulevard Media Player - Phase 3 Installation Guide
## Real Media Scanning + Full Video Player

---

## 🎯 What's New in Phase 3

### ✨ Features Added:
1. **Real Media Scanner** - Scans actual device storage for videos/audio
2. **Permission Handling** - Proper Android media library permissions
3. **Video Player** - Full-screen playback with custom controls
4. **Progress Tracking** - Live scan progress with file counts
5. **Resolution Detection** - Shows video quality (HD, Full HD, 4K, etc.)
6. **Stack Navigation** - Proper screen transitions

---

## 📦 New/Updated Files

```
src/
├── infrastructure/
│   └── media/
│       └── MediaScannerService.ts ✅ (Real device scanning)
│
├── presentation/
│   ├── navigation/
│   │   └── MainTabNavigator.tsx ✅ (Updated with Stack for VideoPlayer)
│   │
│   └── screens/
│       ├── library/
│       │   └── LibraryScreenUpdated.tsx ✅ (Uses real scanner)
│       │
│       └── player/
│           └── VideoPlayerScreen.tsx ✅ (Full playback UI)
```

---

## 🚀 Installation Steps

### Step 1: Install Required Dependencies
```powershell
# Media library and file system
npx expo install expo-media-library expo-file-system expo-av

# Slider component
npx expo install @react-native-community/slider

# Stack navigation
npx expo install @react-navigation/stack
```

### Step 2: Add Permissions to app.json
Add to `app.json` under `expo.android`:
```json
{
  "expo": {
    "android": {
      "permissions": [
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "READ_MEDIA_VIDEO",
        "READ_MEDIA_AUDIO"
      ]
    }
  }
}
```

### Step 3: Copy New Files
1. **Infrastructure:**
   - `src/infrastructure/media/MediaScannerService.ts`

2. **Screens:**
   - `src/presentation/screens/library/LibraryScreenUpdated.tsx` (replace LibraryScreen.tsx)
   - `src/presentation/screens/player/VideoPlayerScreen.tsx`

3. **Navigation:**
   - `src/presentation/navigation/MainTabNavigator.tsx` (replace)

### Step 4: Update app.json (Complete Example)
```json
{
  "expo": {
    "name": "Boulevard",
    "slug": "boulevard",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0A0A0F"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "android": {
      "permissions": [
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "READ_MEDIA_VIDEO",
        "READ_MEDIA_AUDIO"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0A0A0F"
      },
      "package": "com.yourname.boulevard"
    },
    "plugins": [
      [
        "expo-media-library",
        {
          "photosPermission": "Allow Boulevard to access your media library",
          "savePhotosPermission": "Allow Boulevard to save videos"
        }
      ]
    ]
  }
}
```

### Step 5: Clear Cache and Rebuild
```powershell
# Clear all caches
npx expo start --clear

# Rebuild native code (REQUIRED for new permissions)
npx expo run:android
```

---

## 🎨 What You'll See

### **Permission Request:**
```
┌─────────────────────────────────────┐
│           🔒                        │
│                                     │
│    Permission Required              │
│                                     │
│  Boulevard needs access to your     │
│  media library to display your      │
│  videos and music.                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Grant Permission           │ │  ← Cyan gradient button
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### **Media Scanning:**
```
┌─────────────────────────────────────┐
│            ⏳                       │
│                                     │
│    Scanning media files...          │
│                                     │
│           45 of 127                 │  ← Live progress
│                                     │
│    Inception.mp4                    │  ← Current file
└─────────────────────────────────────┘
```

### **Library with Real Media:**
```
┌─────────────────────────────────────┐
│  Library                        🔄  │
├─────────────────────────────────────┤
│  🔍  Search media...                │
├─────────────────────────────────────┤
│  [All 45]  [Videos 23]  [Music 22] │
├─────────────────────────────────────┤
│  45 files                           │  ← Real count
│                                     │
│  ┌──────────────────────────────┐  │
│  │ 🎬  Inception               ▶│  │  ← Play button
│  │     2:28:15 • Full HD        │  │  ← Real metadata
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 🎬  Interstellar            ▶│  │
│  │     2:49:03 • Full HD        │  │
│  └──────────────────────────────┘  │
│  ...                                │
└─────────────────────────────────────┘
```

### **Video Player:**
```
┌─────────────────────────────────────┐
│  ‹  Inception                    ⋮ │  ← Top controls
│                                     │
│                                     │
│           [VIDEO PLAYING]           │  ← Full-screen video
│                                     │
│                                     │
│  ⏪ 10s     ⏸     ⏩ 10s           │  ← Center controls
│                                     │
│  0:32 ━━━━━━━━━━━━━━━━━━━ 2:28   │  ← Progress bar
│                      🔊 ⚙️ ⛶      │  ← Bottom controls
└─────────────────────────────────────┘
```

---

## 🎬 Video Player Features

### **Player Controls:**
1. **Top Bar:**
   - ‹ Back button (returns to library)
   - Video title
   - ⋮ More menu (settings, share, etc.)

2. **Center Controls:**
   - ⏪ Rewind 10 seconds
   - ⏸/▶ Play/Pause (large button)
   - ⏩ Forward 10 seconds

3. **Bottom Bar:**
   - Current time / Total duration
   - Seek slider (drag to jump)
   - 🔊 Volume control
   - ⚙️ Quality settings
   - ⛶ Fullscreen toggle

### **Auto-Hide Controls:**
- Controls appear on tap
- Auto-hide after 3 seconds of inactivity
- Stays visible when paused

### **Buffering Indicator:**
- ⏳ Spinner during loading
- Disappears when ready to play

### **Auto-Close:**
- Returns to library when video ends

---

## 📊 Media Scanner Features

### **Supported Formats:**

**Video:**
- MP4, MKV, AVI, MOV, M4V, 3GP, WebM, FLV, WMV

**Audio:**
- MP3, M4A, WAV, FLAC, AAC, OGG, WMA, Opus

### **Metadata Extraction:**
- **Duration** - Formatted as HH:MM:SS or MM:SS
- **Resolution** - 4K UHD, Full HD, HD, SD, etc.
- **File Size** - Human-readable (GB, MB, KB)
- **Creation Date** - For sorting (newest first)

### **Scan Progress:**
- **Current/Total count** - "45 of 127"
- **Current filename** - Shows what's being scanned
- **Real-time updates** - Progress bar updates live

---

## 🔧 Permission Handling

### **Android 13+ (API 33+):**
- Uses granular permissions: `READ_MEDIA_VIDEO`, `READ_MEDIA_AUDIO`
- More secure than old `READ_EXTERNAL_STORAGE`

### **Android 10-12 (API 29-32):**
- Uses `READ_EXTERNAL_STORAGE`
- Works with scoped storage

### **Permission Flow:**
1. Check if granted → Scan immediately
2. Not granted → Show permission screen
3. User taps "Grant Permission" → Request permission
4. Denied → Show alert with retry option

### **User Experience:**
- **No permission** → Beautiful permission screen (not system dialog)
- **Permission denied** → Alert with clear explanation
- **Permission granted** → Immediate scan starts

---

## 🐛 Troubleshooting

### Error: "expo-media-library not installed"
```powershell
npx expo install expo-media-library expo-file-system expo-av
```

### Error: "@react-native-community/slider not found"
```powershell
npx expo install @react-native-community/slider
```

### Permission not requested
1. Check `app.json` has permissions array
2. Rebuild native app:
   ```powershell
   cd android
   ./gradlew clean
   cd ..
   npx expo run:android
   ```

### Videos not showing
1. Grant permission in system settings
2. Check if device has media files
3. Supported formats only (see list above)

### Video won't play
1. Ensure expo-av is installed
2. Check video codec is supported (H.264 recommended)
3. Try different file

### Scan taking too long
- Normal for 100+ files
- Progress shows current file
- Can cancel and use search

---

## 📈 What's Next - Phase 4

After Phase 3 is working:

### **Audio Player:**
1. Background playback service
2. Lock screen controls
3. Notification media controls
4. Playlist queue
5. Shuffle/repeat modes

### **Playlists:**
1. Create custom playlists
2. Add/remove media
3. Reorder tracks
4. Share playlists

### **Favorites:**
1. Mark media as favorite
2. Quick access favorites tab
3. Sync across devices

### **Download Manager:**
1. Download from URLs
2. Queue management
3. Progress tracking
4. Pause/resume downloads

---

## ✅ Success Checklist

Run the app. You should see:
- [ ] Permission request screen (if first time)
- [ ] Grant permission works
- [ ] Scanning starts automatically
- [ ] Progress shows "X of Y files"
- [ ] Real device media appears in list
- [ ] Tap video → Opens full-screen player
- [ ] Video plays smoothly
- [ ] Controls appear/hide on tap
- [ ] Seek bar works
- [ ] Back button returns to library
- [ ] Resolution labels correct (HD, Full HD, etc.)

---

## 🎊 Phase 3 Complete!

You now have:
- ✅ Real device media scanning
- ✅ Permission handling
- ✅ Full video playback
- ✅ Custom player controls
- ✅ Progress tracking
- ✅ Resolution detection
- ✅ Proper navigation

**Next: Audio player with background playback!** 🎵

Run it:
```powershell
npx expo install expo-media-library expo-file-system expo-av @react-native-community/slider @react-navigation/stack
npx expo run:android
```

Your media player is now **functional** and **beautiful**! 🚀✨
