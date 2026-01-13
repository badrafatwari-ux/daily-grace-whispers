# Android App Assets Guide

This document explains how to use the generated app icons and splash screen for your Android build.

## Generated Assets

### App Icons
Located in `src/assets/android/`:

| Folder | Size | DPI |
|--------|------|-----|
| `mipmap-mdpi/ic_launcher.png` | 48x48 | ~160dpi |
| `mipmap-hdpi/ic_launcher.png` | 72x72 | ~240dpi |
| `mipmap-xhdpi/ic_launcher.png` | 96x96 | ~320dpi |
| `mipmap-xxhdpi/ic_launcher.png` | 144x144 | ~480dpi |
| `mipmap-xxxhdpi/ic_launcher.png` | 192x192 | ~640dpi |

### Play Store Icon
- `src/assets/icon-512.png` - 512x512 (for Play Store listing)

### Splash Screen
- `src/assets/splash-base.png` - Base splash screen image

## Installation Instructions

After running `npx cap add android`, copy the icons to the Android project:

```bash
# Navigate to your project
cd your-project

# Copy icons to Android resources
cp src/assets/android/mipmap-mdpi/ic_launcher.png android/app/src/main/res/mipmap-mdpi/
cp src/assets/android/mipmap-hdpi/ic_launcher.png android/app/src/main/res/mipmap-hdpi/
cp src/assets/android/mipmap-xhdpi/ic_launcher.png android/app/src/main/res/mipmap-xhdpi/
cp src/assets/android/mipmap-xxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxhdpi/
cp src/assets/android/mipmap-xxxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxxhdpi/
```

### For Round Icons (Android 7.1+)
Copy the same icons as `ic_launcher_round.png`:

```bash
cp src/assets/android/mipmap-mdpi/ic_launcher.png android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png
cp src/assets/android/mipmap-hdpi/ic_launcher.png android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png
cp src/assets/android/mipmap-xhdpi/ic_launcher.png android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png
cp src/assets/android/mipmap-xxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png
cp src/assets/android/mipmap-xxxhdpi/ic_launcher.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png
```

### Splash Screen Setup
The splash screen is configured in `capacitor.config.json`. The base image will be used automatically.

For custom splash screens per density:
1. Create `android/app/src/main/res/drawable/splash.png`
2. Or use drawable-mdpi, drawable-hdpi, etc. folders for density-specific versions

## Play Store Submission

Use `src/assets/icon-512.png` for:
- High-res icon (512x512) - Required for Play Store listing
- Feature graphic can be created separately (1024x500)

## Foreground/Background Icons (Adaptive Icons)

For Android 8.0+ adaptive icons, you may want to create:
- `ic_launcher_foreground.png` - The icon shape
- `ic_launcher_background.png` - The background layer

The current icons work as standard launcher icons on all Android versions.
