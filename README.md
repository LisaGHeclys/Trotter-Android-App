# Trotter Mobile
> This is an Epitech end of study project.

# Introduction
Trotter Mobile is a key component of a larger project that includes a Web App and a Showcase Site. The project aims to support solo travelers by providing them with a comprehensive platform to help them plan and organize their journeys.

The app is specifically designed to generate paths for solo travelers based on their preferences and interests. It will provide users with personalized recommendations on destinations, attractions, accommodations, and activities, taking into account factors such as budget, travel style, and duration of stay. Users can customize their itinerary based on their preferences and receive real-time updates and alerts as they travel.

The development of Trotter is a significant undertaking that is expected to take three years to complete fully. The app will be available for both iOS and Android devices.

## Technologies used
- React Native
- Mapbox
- Gradlew
- Jest

## Prerequisites
- Gradlew
- React Native
- Metro

# How to name your branch and how to name your commit
### Branches
- What to do with the branches
   - main : no push on main, it's forbidden. it represents the project on production.
   - develop : every task that's finished and reviewed will be merged on develop.
   - release : before every meeting with the group projects, a release is taken from develop to test every feature, when everything's corrected, it's merged on main and on develop.

- How to branch
  ```
  feature/JIRACARD/TASK  
  ```

### Commits
- How to commit
  ```
  [CLICKUPCARD](TYPE): description of what has been done 
  ```

- Type
   - build : changes that directly affects the build system or dependency (npm etc...)
   - ci : changes that affects the integrations files and scripts or configuration (github actions, automation etc...)
   - add : add a new feature
   - fix : correcting a bug or feature
   - perf : performance improvement
   - refactor : modification that doesn't include a new feature nor a perf improvement
   - style : changes that doesn't affect any features (indents, linters, forgotten space etc...)
   - docs : documentation
   - test : adding or changes any tests concerning the project

And you're all set to contribute to our project.

# Useful ressources
- [License](https://github.com/TrotterApp/mobile/blob/main/LICENSE.md)
- [Code of Conduct](https://github.com/TrotterApp/mobile/blob/main/CODE_OF_CONDUCT.md)

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
