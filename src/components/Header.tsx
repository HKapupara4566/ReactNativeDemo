import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Cart_Icon from '../assets/svg/Cart_Icon.svg';
import {COLORS} from '../utils/colors';
import Back_Icon from '../assets/svg/Back_Icon.svg';
import Cart_Icon_White from '../assets/svg/Cart_Icon_White.svg';
import {useNavigation} from '@react-navigation/native';
import navigationRoutes from '../constants/navigationRoutes';
import {useSelector} from 'react-redux';

interface Header {
  isBackButton: boolean;
  headerBG: string;
  isWhiteCart: boolean;
  title: string;
}

export const Header: React.FC<Header> = ({
  isBackButton,
  headerBG,
  isWhiteCart,
  title,
}) => {
  const navigation = useNavigation();
  const cartArr = useSelector(state => state?.app?.cartArr ?? []);

  return (
    <View style={{backgroundColor: headerBG ? headerBG : COLORS.PURPLE}}>
      <SafeAreaView
        style={{backgroundColor: headerBG ? headerBG : COLORS.PURPLE}}
      />
      <View style={styles.headerMainViewStyle}>
        {isBackButton ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButtonViewStyle}>
              <Back_Icon height={16} width={16} />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.headerNameStyle}>Hey, Rahul</Text>
        )}

        <View style={styles.headerTitleStyle}>
          <Text>{title}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationRoutes.cartScreen);
          }}
          style={styles.cartIconStyle}>
          {isWhiteCart ? (
            <Cart_Icon_White height={'100%'} width={'100%'} />
          ) : (
            <Cart_Icon height={'100%'} width={'100%'} />
          )}
          {cartArr?.length > 0 && (
            <View style={styles.cartItemCountView}>
              <Text style={styles.cartCountText}>{cartArr?.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMainViewStyle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  backButtonViewStyle: {
    height: 30,
    aspectRatio: 1,
    backgroundColor: COLORS.OFF_WHITE,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 3,
  },
  headerNameStyle: {
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
    color: COLORS.WHITE,
  },
  headerTitleStyle: {flex: 1, marginLeft: 20},
  cartIconStyle: {height: 26, aspectRatio: 1},
  cartItemCountView: {
    position: 'absolute',
    right: -5,
    top: -7,
    backgroundColor: COLORS.DARK_YELLOW,
    width: 20,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {color: COLORS.WHITE, fontWeight: '700'},
});
