# Boulevard Media Player - Phase 1 Installation Guide
## Setting Up the Main App

---

## 📦 Required Dependencies

### Step 1: Install Expo Packages
```powershell
# Core Expo packages (already installed)
npx expo install expo-linear-gradient expo-blur
```

### Step 2: Install Font Packages
```powershell
# Google Fonts for distinctive typography
npx expo install expo-font @expo-google-fonts/space-grotesk @expo-google-fonts/inter @expo-google-fonts/jetbrains-mono
```

### Step 3: Verify All Dependencies
Your `package.json` should already have these (from previous setup):
- ✅ react-native-reanimated (animations)
- ✅ react-native-gesture-handler (touch interactions)
- ✅ react-native-safe-area-context (safe areas)
- ✅ expo-linear-gradient (gradients)
- ✅ expo-blur (glassmorphism effects)

---

## 🗂️ File Structure Created

```
src/
├── core/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Media.ts ✅ (Domain models)
│   │   ├── repositories/
│   │   │   └── IMediaRepository.ts ✅ (Repository contracts)
│   │   └── usecases/
│   │       └── media/
│   │           └── GetMediaList.ts ✅ (Business logic)
│   └── utils/
│       └── Result.ts ✅ (Error handling)
│
├── presentation/
│   ├── screens/
│   │   └── home/
│   │       └── HomeScreen.tsx ✅ (Main UI)
│   └── theme/
│       └── index.ts ✅ (Design system)
│
App.tsx ✅ (Updated)
```

---

## 🚀 Installation Steps

### Step 1: Copy All Files
Copy the following files to your project:

1. **Core Domain Layer:**
   - `src/core/domain/entities/Media.ts`
   - `src/core/domain/repositories/IMediaRepository.ts`
   - `src/core/domain/usecases/media/GetMediaList.ts`
   - `src/core/utils/Result.ts`

2. **Presentation Layer:**
   - `src/presentation/theme/index.ts`
   - `src/presentation/screens/home/HomeScreen.tsx`

3. **Root:**
   - `App.tsx` (replace existing)

### Step 2: Install Dependencies
```powershell
# Install all required packages
npx expo install expo-linear-gradient expo-blur expo-font @expo-google-fonts/space-grotesk @expo-google-fonts/inter @expo-google-fonts/jetbrains-mono
```

### Step 3: Update app.json (Add Fonts)
Add this to your `app.json` under `expo`:
```json
{
  "expo": {
    "plugins": [
      "expo-secure-store",
      [
        "expo-font",
        {
          "fonts": [
            "./node_modules/@expo-google-fonts/space-grotesk/SpaceGrotesk_700Bold.ttf",
            "./node_modules/@expo-google-fonts/space-grotesk/SpaceGrotesk_600SemiBold.ttf",
            "./node_modules/@expo-google-fonts/inter/Inter_400Regular.ttf",
            "./node_modules/@expo-google-fonts/jetbrains-mono/JetBrainsMono_400Regular.ttf"
          ]
        }
      ]
    ]
  }
}
```

### Step 4: Load Fonts in App.tsx
Update `App.tsx` to load fonts:
```typescript
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './src/presentation/screens/home/HomeScreen';
import {
  useFonts,
  SpaceGrotesk_700Bold,
  SpaceGrotesk_600SemiBold,
} from '@expo-google-fonts/space-grotesk';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_700Bold,
    SpaceGrotesk_600SemiBold,
    Inter_400Regular,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0F' }}>
        <ActivityIndicator size="large" color="#00F5FF" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <HomeScreen />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

### Step 5: Clear Cache and Rebuild
```powershell
# Clear all caches
npx expo start --clear

# If running on Android
npx expo run:android
```

---

## ✨ What You'll See

After successful installation, the app will display:

### 🎨 **Distinctive Cinematic Design:**
- **Deep space black background** (#0A0A0F)
- **Electric cyan accents** (#00F5FF) with glow effects
- **Animated logo** with pulsing glow
- **Glassmorphism cards** with blur effects
- **Smooth animations** (FadeIn, slide effects)

### 📱 **Home Screen Features:**
1. **Hero Section:**
   - Animated "B" logo with gradient
   - "BOULEVARD" title in Space Grotesk font
   - Tagline: "Your Cinematic Media Experience"

2. **Quick Access Grid:**
   - Videos (24 files)
   - Music (156 tracks)
   - Favorites (12 items)
   - Recent (8 items)

3. **Continue Watching:**
   - Horizontal scroll of media cards
   - Progress bars showing completion
   - Duration badges

4. **Your Playlists:**
   - Road Trip Mix (24 tracks)
   - Workout Energy (32 tracks)
   - Late Night Vibes (18 tracks)

---

## 🎯 Design Philosophy

Boulevard uses a **dark-cinematic aesthetic** inspired by premium media players:

- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (technical)
- **Colors:** Deep blacks with electric cyan and warm gold accents
- **Effects:** Glassmorphism, glow shadows, smooth gradients
- **Animations:** Staggered fade-ins, pulsing glows
- **Layout:** Asymmetric cards, generous spacing

---

## 🔧 Troubleshooting

### Issue: "Cannot find module '@expo-google-fonts/space-grotesk'"
```powershell
npx expo install @expo-google-fonts/space-grotesk @expo-google-fonts/inter @expo-google-fonts/jetbrains-mono
```

### Issue: "LinearGradient is undefined"
```powershell
npx expo install expo-linear-gradient
```

### Issue: "BlurView is undefined"
```powershell
npx expo install expo-blur
```

### Issue: Fonts not loading
1. Check `app.json` has font plugin configured
2. Restart Metro bundler: `npx expo start --clear`
3. Rebuild native app: `npx expo run:android`

### Issue: Animation stuttering
- Enable Hermes engine (should be enabled by default in Expo 54)
- Check that Reanimated plugin is last in `babel.config.js`

---

## 📈 Next Steps

After this phase works:

1. **Phase 2:** Add navigation (Tab bar, Stack navigation)
2. **Phase 3:** Implement real media scanning
3. **Phase 4:** Build video/audio player
4. **Phase 5:** Add playlists and favorites
5. **Phase 6:** Implement download manager

---

## 🎊 Success Indicators

You'll know it's working when you see:
- ✅ Deep black background
- ✅ Animated pulsing logo
- ✅ Electric cyan glow effects
- ✅ Smooth card animations
- ✅ Glassmorphism blur on quick action cards
- ✅ No console errors

---

## 📞 Common Errors

### "Invariant Violation: requireNativeComponent: BlurView was not found"
**Fix:**
```powershell
cd android
./gradlew clean
cd ..
npx expo run:android
```

### "Unable to resolve module expo-linear-gradient"
**Fix:**
```powershell
npm install --legacy-peer-deps
npx expo install expo-linear-gradient
```

---

**You're building something beautiful! 🎬✨**

Run `npx expo start --clear` and watch Boulevard come to life!
