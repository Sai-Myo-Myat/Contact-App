import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FormProvider, useForm} from 'react-hook-form';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {QueryClient, QueryClientProvider} from 'react-query';

import ContactDetail from './Screens/ContactDetail';
import Form from './Screens/CreateContact';
import HomeScreen from './Screens/HomeScreen';

import CustomRightHeader from './Components/CustomRightHeader';
import {ContextType} from './types';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const methods = useForm<ContextType>();
  return (
    <ActionSheetProvider>
      <FormProvider {...methods}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <StatusBar barStyle={'default'} />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#212A3E',
                },
                headerTintColor: '#F1F6F9',
              }}>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: 'Contacts',
                  // eslint-disable-next-line react/no-unstable-nested-components
                  headerRight: () => {
                    return <CustomRightHeader />;
                  },
                }}
              />
              <Stack.Screen name="Form" component={Form} />
              <Stack.Screen name="Detail" component={ContactDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </FormProvider>
    </ActionSheetProvider>
  );
}
