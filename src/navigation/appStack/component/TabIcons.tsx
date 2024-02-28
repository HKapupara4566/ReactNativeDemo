import React from 'react';
import navigationRoutes from '../../../constants/navigationRoutes';
import Home_Filled from '../../../assets/svg/Home_Filled.svg';
import Home_OutLine from '../../../assets/svg/Home_OutLine.svg';
import Category_Outline from '../../../assets/svg/Category_Outline.svg';
import Category_Filled from '../../../assets/svg/Category_Filled.svg';
import Favourite_Filed from '../../../assets/svg/Favourite_Filed.svg';
import Favourite_Outline from '../../../assets/svg/Favourite_Outline.svg';
import More_Icon from '../../../assets/svg/More_Icon.svg';
import {COLORS} from '../../../utils/colors';

type TabIconsProps = {
  focused: boolean;
  routName: string;
};

const TabIcons: React.FC<TabIconsProps> = ({focused, routName}) => {
  return (
    <>
      {routName === navigationRoutes?.home ? (
        <>{!focused ? <Home_OutLine /> : <Home_Filled />}</>
      ) : routName === navigationRoutes.categories ? (
        <>{!focused ? <Category_Outline /> : <Category_Filled />}</>
      ) : routName === navigationRoutes.favourite ? (
        <>
          {!focused ? (
            <Favourite_Outline />
          ) : (
            <Favourite_Filed fill={COLORS.DARK_YELLOW} />
          )}
        </>
      ) : routName === navigationRoutes.more ? (
        <>
          {!focused ? <More_Icon /> : <More_Icon fill={COLORS.DARK_YELLOW} />}
        </>
      ) : null}
    </>
  );
};

export default TabIcons;
