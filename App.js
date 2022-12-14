import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Text, View } from "react-native"
import { AuthProvider } from "./hooks/useAuth"
import StackNavigator from "./StackNavigator"

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>{/* HOC - Higher Order Component */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
