# Boulevard Media Player - Phase 2 Installation Guide
## Navigation + Media Library

---

## 🎯 What's New in Phase 2

### ✨ Features Added:
1. **Bottom Tab Navigation** - 4 tabs with animated icons
2. **Library Screen** - Media browser with search and filters
3. **Player Screen** - Placeholder with feature preview
4. **Settings Screen** - App configuration and preferences
5. **Media Scanning** - Mock media detection (real implementation next)

---

## 📦 New Files Created

```
src/
├── presentation/
│   ├── navigation/
│   │   └── MainTabNavigator.tsx ✅ (Tab navigation)
│   └── screens/
│       ├── library/
│       │   └── LibraryScreen.tsx ✅ (Media browser)
│       ├── player/
│       │   └── PlayerScreen.tsx ✅ (Placeholder)
│       └── settings/
│           └── SettingsScreen.tsx ✅ (Settings UI)
│
App.tsx ✅ (Updated with navigation + fonts)
```

---

## 🚀 Installation Steps

### Step 1: Install Navigation Dependencies
```powershell
npx expo install @react-navigation/native @react-navigation/bottom-tabs
```

### Step 2: Copy New Files
Copy these files to your project:

1. **Navigation:**
   - `src/presentation/navigation/MainTabNavigator.tsx`

2. **New Screens:**
   - `src/presentation/screens/library/LibraryScreen.tsx`
   - `src/presentation/screens/player/PlayerScreen.tsx`
   - `src/presentation/screens/settings/SettingsScreen.tsx`

3. **Updated Root:**
   - `App.tsx` (replace existing)

### Step 3: Install Font Dependencies
```powershell
npx expo install expo-font @expo-google-fonts/space-grotesk @expo-google-fonts/inter @expo-google-fonts/jetbrains-mono
```

### Step 4: Clear Cache and Run
```powershell
npx expo start --clear
```

---

## 🎨 What You'll See

### **Tab Navigation Bar:**
- **Bottom-fixed navigation** with 4 tabs
- **Animated tab icons** (scale + glow on active)
- **Cyan active indicator** line under current tab
- **Dark glassmorphism** background

### **Library Screen:**
```
┌─────────────────────────────────────┐
│  Library                        🔄  │  ← Header with refresh
├─────────────────────────────────────┤
│  🔍  Search media...                │  ← Search bar
├─────────────────────────────────────┤
│  [All 6]  [Videos 3]  [Music 3]    │  ← Filter tabs
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐  │
│  │ 🎬  Inception                │  │  ← Media cards
│  │     2:28:00 • 2.4 GB         │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 🌌  Interstellar             │  │
│  │     2:49:00 • 3.1 GB         │  │
│  └──────────────────────────────┘  │
│  ... (scrollable list)              │
└─────────────────────────────────────┘
```

### **Player Screen (Placeholder):**
```
┌─────────────────────────────────────┐
│                                     │
│           ┌─────────┐               │
│           │   ▶️    │               │  ← Large gradient icon
│           └─────────┘               │
│                                     │
│         Media Player                │
│       Coming in Phase 3             │
│                                     │
│   Features Preview:                 │
│   🎬 Full-screen video playback     │
│   🎵 Background audio playback      │
│   ⏯️ Play/Pause/Seek controls       │
│   🔊 Volume & brightness gestures   │
│   📺 Picture-in-Picture mode        │
│   ⏭️ Playlist queue management      │
│                                     │
└─────────────────────────────────────┘
```

### **Settings Screen:**
```
┌─────────────────────────────────────┐
│  Settings                           │
│                                     │
│  ⏯️ Playback                        │
│  ├─ Auto-play next         [ON]    │  ← Toggles
│  ├─ Playback quality    High >     │  ← Buttons
│  └─ Audio output        Speaker >  │
│                                     │
│  📥 Downloads                       │
│  ├─ WiFi only             [ON]     │
│  ├─ Storage location       ...  >  │
│  └─ Clear cache          124 MB >  │
│                                     │
│  🔔 Notifications                   │
│  └─ Enable notifications  [OFF]    │
│                                     │
│  ℹ️ About                           │
│  ├─ App version          1.0.0 >   │
│  ├─ Privacy policy              >  │
│  ├─ Terms of service            >  │
│  └─ Rate Boulevard              >  │
└─────────────────────────────────────┘
```

---

## 🎯 Tab Navigation Features

### **Animated Tab Bar:**
1. **Scale Animation** - Active tab icon scales up 1.2x
2. **Glow Effect** - Background highlight on active tab
3. **Indicator Line** - Cyan line appears under active tab
4. **Spring Physics** - Smooth bouncy transitions

### **Tab Icons:**
- 🏠 **Home** - Main dashboard
- 📁 **Library** - Media browser
- ▶️ **Player** - Media playback
- ⚙️ **Settings** - App configuration

---

## 📱 Library Screen Features

### **Search Functionality:**
- Live search as you type
- Searches title, artist, album
- Clear button (✕) appears when typing
- Instant filtering

### **Filter Tabs:**
- **All** - Shows everything (6 items)
- **Videos** - Only video files (3 items)
- **Music** - Only audio files (3 items)
- Badge count updates dynamically

### **Media Cards:**
- **Icon** - 🎬 for videos, 🎵 for music
- **Title** - File name
- **Metadata** - Duration • File size
- **More button** - ⋮ for actions (future)

### **States:**
- **Loading** - Spinner + "Scanning media files..."
- **Empty** - 📭 icon + "No media found"
- **List** - Scrollable media cards

---

## 🔧 Settings Screen Features

### **Playback Settings:**
- **Auto-play next** - Toggle switch
- **Playback quality** - High (1080p) / Medium / Low
- **Audio output** - Speaker / Headphones / Bluetooth

### **Download Settings:**
- **WiFi only** - Toggle to prevent cellular usage
- **Storage location** - Show file path
- **Clear cache** - Show cache size (124 MB)

### **Notifications:**
- **Enable notifications** - Toggle for updates

### **About Section:**
- **App version** - 1.0.0
- **Privacy policy** - Link (future)
- **Terms of service** - Link (future)
- **Rate Boulevard** - Link to app store (future)

---

## ⚡ Performance Notes

### **Optimizations:**
1. **FlatList** - Efficient rendering for large media lists
2. **Memoization** - Tab icons re-render only on state change
3. **Lazy Loading** - Screens load only when navigated to
4. **Animated** - 60fps animations with Reanimated

### **Memory Management:**
- Navigation stack properly managed
- Screens unmount when not active
- Animation values cleaned up

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@react-navigation/native'"
```powershell
npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

### Error: "useFonts is not a function"
```powershell
npx expo install expo-font @expo-google-fonts/space-grotesk @expo-google-fonts/inter @expo-google-fonts/jetbrains-mono
```

### Tab bar not showing
- Check if `MainTabNavigator` is wrapped in `NavigationContainer`
- Verify `App.tsx` has `<NavigationContainer>` component

### Fonts not loading
```powershell
# Clear cache and rebuild
npx expo start --clear
```

---

## 📈 What's Next - Phase 3

After navigation is working, we'll implement:

### **Real Media Scanning:**
1. Request storage permissions
2. Scan device for video/audio files
3. Extract metadata (duration, artist, album)
4. Generate thumbnails
5. Save to local database

### **Video Player:**
1. Full-screen playback
2. Custom controls UI
3. Gesture controls (seek, volume, brightness)
4. Subtitle support
5. Picture-in-Picture

### **Audio Player:**
1. Background playback service
2. Lock screen controls
3. Notification media controls
4. Playlist queue
5. Shuffle/repeat modes

---

## ✅ Success Checklist

Run the app. You should see:
- [ ] Bottom tab bar with 4 tabs
- [ ] Tab icons animate on press
- [ ] Home screen accessible
- [ ] Library screen with mock media
- [ ] Search and filter working
- [ ] Player placeholder visible
- [ ] Settings screen with toggles
- [ ] All tabs navigable
- [ ] Smooth transitions

---

## 🎊 Phase 2 Complete!

You now have:
- ✅ Full navigation system
- ✅ 4 complete screens
- ✅ Search and filtering
- ✅ Mock media library
- ✅ Settings interface
- ✅ Professional tab bar

**Next: Real media scanning and playback!** 🚀

Run it:
```powershell
npx expo start --clear
```
