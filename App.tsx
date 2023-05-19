import { StyleSheet, StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import HomeScreen from './Screens/HomeScreen';
import Form from './Screens/Form';

import CustomRightHeader from './Components/CustomRightHeader';
import { BottomSheetContext } from '@gorhom/bottom-sheet/lib/typescript/contexts';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"default"} />
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: {
          backgroundColor: "#212A3E",
        },
        headerTintColor: "#F1F6F9"
      }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerTitle: "Contacts",
            headerRight: () => {
              return (
                <CustomRightHeader />
              )
            } 
          }} />
        <Stack.Screen name='Form' component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
