import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './src/store'
import UsersCatalog from './src/components/UserCatalog/UsersCatalog'
import UserPage from './src/components/UserPage/UserPage'
import AddEditPage from './src/components/AddEditPage/AddEditPage'

const RootStack = createStackNavigator();

const screenOptions = {
                        cardStyle: { backgroundColor: 'transparent' },
                        cardOverlayEnabled: true,
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                          cardStyle: {
                            opacity: progress.interpolate({
                              inputRange: [0, 0.5, 0.9, 1],
                              outputRange: [0, 0.25, 0.7, 1],
                            }),
                          },
                          overlayStyle: {
                            opacity: progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 0.5],
                              extrapolate: 'clamp',
                            }),
                          },
                        }),
                      }

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator 
          initialRouteName="Home"
          headerMode="none"
          screenOptions={screenOptions}
          headerMode="none"
        >
          <RootStack.Screen name="Home" component={UsersCatalog} />
          <RootStack.Screen name="UserPage" component={UserPage} />
          <RootStack.Screen name="AddEditPage" component={AddEditPage} />
        </RootStack.Navigator>
      </NavigationContainer>
          </Provider>
  );
};

export default App;