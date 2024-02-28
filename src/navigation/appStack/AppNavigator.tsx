import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationRoutes from '../../constants/navigationRoutes';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailScreen from '../../screens/app/productDetailScreen';
import CartScreen from '../../screens/app/cartScreen';

const AppStack = createNativeStackNavigator();
const InitialAppStack = createNativeStackNavigator();

const AppNavigator: React.FC = React.memo(() => {
  return (
    <NavigationContainer>
      <InitialAppStack.Navigator
        initialRouteName={navigationRoutes.bottomTabNavigator}
        screenOptions={{headerShown: false}}>
        <InitialAppStack.Screen
          name={navigationRoutes.stackNavigator}
          component={() => <StackNavigator />}
        />
      </InitialAppStack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;

const StackNavigator: React.FC = React.memo(() => {
  return (
    <AppStack.Navigator
      initialRouteName={navigationRoutes.bottomTabNavigator}
      screenOptions={{headerShown: false}}>
      <AppStack.Screen
        name={navigationRoutes.bottomTabNavigator}
        component={BottomTabNavigator}
      />
      <AppStack.Screen
        name={navigationRoutes.productDetailScreen}
        component={ProductDetailScreen}
      />
      <AppStack.Screen
        name={navigationRoutes.cartScreen}
        component={CartScreen}
      />
    </AppStack.Navigator>
  );
});
