import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationRoutes from '../../constants/navigationRoutes';
import DeviceInfo from 'react-native-device-info';
import {COLORS} from '../../utils/colors';
import {boxShadow} from '../../utils/mixins';
import {StyleSheet} from 'react-native';
import HomeScreen from '../../screens/app/homeScreen';
import TabIcons from './component/TabIcons';
import TabLabels from './component/TabLabels';
import Categories from '../../screens/app/categoriesScreen';
import FavouriteScreen from '../../screens/app/favouriteScreen';
import MoreScreen from '../../screens/app/moreScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  let hasDynamicIsland = DeviceInfo.hasDynamicIsland();

  const styles = dynamicStyles(hasDynamicIsland);

  return (
    <BottomTab.Navigator
      initialRouteName={navigationRoutes.home}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        headerShown: false,
        tabBarStyle: styles?.tabBarStyle,
        tabBarIcon: ({focused}) => (
          <TabIcons focused={focused} routName={route.name} />
        ),
        tabBarLabel: ({focused, position}) => (
          <TabLabels
            focused={focused}
            position={position}
            routName={route.name}
          />
        ),
      })}>
      <BottomTab.Screen name={navigationRoutes.home} component={HomeScreen} />
      <BottomTab.Screen
        name={navigationRoutes.categories}
        component={Categories}
      />
      <BottomTab.Screen
        name={navigationRoutes.favourite}
        component={FavouriteScreen}
      />
      <BottomTab.Screen name={navigationRoutes.more} component={MoreScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const dynamicStyles = (hasDynamicIsland: boolean) => {
  return StyleSheet.create({
    tabBarStyle: {
      backgroundColor: COLORS.WHITE,
      borderTopColor: COLORS.WHITE,
      shadowColor: COLORS.BLACK,
      borderTopWidth: 1,
      ...boxShadow({height: 3, width: 5}, 0.3, 7, COLORS.BLACK),
    },
  });
};
