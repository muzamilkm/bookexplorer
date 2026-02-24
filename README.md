# Book Explorer

A React native app that lets you search and explore books. Uses Open Library for book data and the NYTimes Article Search API for reviews.

Built for the Shadiyana Mobile Dev test case.

## Features

- Browse trending books on the home screen
- Search any book with live results
- Book details with cover, author, description and subject tags
- Star ratings from Open Library
- NYT book reviews with links to the full article
- Error handling with retry across all screens

## Tech stack

- React Native (CLI, not Expo)
- TypeScript
- React Navigation (native stack + bottom tabs)
- Open Library API (no key needed)
- NYTimes Article Search API

## Project structure

```
src/
  components/    BookCard, ErrorView
  constants/     colors, spacing, typography, api keys
  hooks/         useDebounce
  navigation/    RootNavigator, BottomTabNavigator
  screens/       HomeScreen, SearchScreen, BookDetailScreen
  services/      apiClient, openLibraryService, nyTimesService
  types/         book, nyt, navigation
```

## Setup

You need Node, JDK 17, Android Studio with an emulator set up.

```bash
git clone https://github.com/muzamilkm/bookexplorer.git
cd bookexplorer
npm install
```

Add your NYT API key in `src/constants/api.ts` if needed.

### Run on android

```bash
npx react-native run-android
```

### Run tests

```bash
npx jest
```

## Building the APK

To build a standalone APK that works without a Metro server:

```bash
cd android
.\gradlew.bat assembleRelease
```

The APK will be at `android/app/build/outputs/apk/release/app-release.apk`


## API keys

- Open Library: no key needed
- NYTimes: get one from https://developer.nytimes.com, put it in `src/constants/api.ts`
