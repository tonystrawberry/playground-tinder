<p align="center">
  <a>
    <img src="https://tinder.com/static/tinder.png" width="60" />
  </a>
</p>
<h1 align="center">
  Tinder clone
</h1>

- 🎯 React Native tutorial from https://www.youtube.com/watch?v=qJaFIGjyRms&ab_channel=SonnySangha
- 🚀 This Tinder clone application is a multi-platform application built using React Native
- 🎨 Styling done with <a href="https://www.nativewind.dev/">NativeWind</a> (TailwindCSS)
- 📱 Using ExpoGo for live rendering on the mobile phone
- 🚀 Used the Context API provided by React for handling the state
- 🪝 Implemeted a custom hook that provides the logic and data for authentication (`useAuth.js`)

# 📚 Libraries used
- `nativewind` for the styling
- `expo-auth-session` for implementing the Google OAuth Authentication (reference: https://docs.expo.dev/guides/authentication/#google)
- `react-navigation` for handling the navigation between screens
- `firebase` for interacting with Firebase Firestore and Authentication 
- `react-native-deck-swiper` for the swipe functionality of profile cards

# 🗂 Folder structure
- `assets` for the images
- `components` for the reusable components
- `screens` for the different application pages (one screen component per page)
- `App.js` is the entrypoint of the application
- `babel.config.js` for converting ES code into a backwards compatible version of JavaScript
- `tailwind.config.js` for specifying which files can use TailwindCSS styling

# 🚀 Google Authentication Setup
- On Firebase (https://console.firebase.google.com/), create a project and a web application
- Activate Firestore & Authentication
- Copy the Firebase web application settings into `firebase.js` at the root of the project
- On the Google console (https://console.cloud.google.com/), select your project and go to `credentials`
- In OAuth 2.0 Client IDs, select the web client (which should have been created beforehand)
- In `Authorized JavaScript origins`, add `https://auth.expo.io` and `https://localhost:19006`
- In `Authorized redirect URIs`, add `https://auth.expo.io/@{expo_username)/{expo_application}` and `https://localhost:19006`

# 🔖 Notes for myself
- Firebase link: https://console.firebase.google.com/u/0/project/playground-tinder/overview
- Google Cloud link: https://console.cloud.google.com/welcome?project=playground-tinder
