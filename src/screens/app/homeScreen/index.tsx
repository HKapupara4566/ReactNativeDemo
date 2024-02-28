import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAllProducts} from '../../../services/product';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../../utils/colors';
import Plush_Icon from '../../../assets/svg/Plush_Icon.svg';
import {Header} from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import navigationRoutes from '../../../constants/navigationRoutes';
import Favourite_Filed from '../../../assets/svg/Favourite_Filed.svg';
import Favourite_Outline from '../../../assets/svg/Favourite_Outline.svg';
import {setCartItemData, setFavouriteItemData} from '../../../helper/storage';
import {useDispatch, useSelector} from 'react-redux';
import {setCartArr, setFavouriteArr} from '../../../store/actions/app';
import Toast from 'react-native-simple-toast';

const HomeScreen: React.FC = () => {
  const [productsData, setProductsData] = useState<object>({});
  const favouriteArr = useSelector(state => state?.app?.favouriteArr ?? []);
  const cartArr = useSelector(state => state?.app?.cartArr ?? []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProductsData();
  }, []);

  const getAllProductsData = () => {
    getAllProducts()
      .then(res => {
        setProductsData(res?.data);
      })
      .catch(error => {
        console.log('getAllProducts error ==> ', error);
      });
  };
  const onFavouritePress = item => {
    let alreadyAddedData = favouriteArr?.find(el => el?.id == item?.id);
    if (alreadyAddedData?.id) {
      let newArrWithoutSelectedData = favouriteArr?.filter(
        el => el?.id != item?.id,
      );

      setFavouriteItemData(JSON.stringify(newArrWithoutSelectedData));
      dispatch(setFavouriteArr(newArrWithoutSelectedData));
    } else {
      let favouriteProductArr = [...favouriteArr, item];

      setFavouriteItemData(JSON.stringify(favouriteProductArr));
      dispatch(setFavouriteArr(favouriteProductArr));
    }
  };

  const onAddToCartPress = item => {
    let alreadyAddedData = cartArr?.find(el => el?.id == item?.id);
    if (alreadyAddedData?.id) {
      let quantity;
      let cartItemDataArr: any[] = cartArr?.map(el => {
        if (el?.id == item?.id) {
          let updateData = {...el, qty: el?.qty + 1};
          quantity = el?.qty + 1;
          return updateData;
        } else {
          return el;
        }
      });

      setCartItemData(JSON.stringify(cartItemDataArr));
      dispatch(setCartArr(cartItemDataArr));
      Toast.show(`Added ${quantity} quantity in Cart.`);
    } else {
      let cartItemDataArr: any[] = [...cartArr, {...item, qty: 1}];

      setCartItemData(JSON.stringify(cartItemDataArr));
      dispatch(setCartArr(cartItemDataArr));
    }
  };

  const productRenderContainer = ({item, index}) => {
    let alreadyAddedData = favouriteArr?.find(el => el?.id == item?.id);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation?.navigate(navigationRoutes.productDetailScreen, {
            productData: item,
          })
        }
        style={styles.renderContinerMainView}>
        <FastImage
          style={styles.fastImageStyle}
          source={{
            uri: item?.thumbnail,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.detailMainView}>
          <View style={styles.flex1}>
            <Text style={styles.priceText}>${item?.price}</Text>
            <Text numberOfLines={1} style={styles.titleText}>
              {item?.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => onAddToCartPress(item)}
            style={styles.plushIconStyle}>
            <Plush_Icon height={'100%'} width={'100%'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            onFavouritePress(item);
          }}
          style={styles.favouriteIconStyle}>
          {!!alreadyAddedData ? (
            <Favourite_Filed height={'100%'} width={'100%'} fill={'red'} />
          ) : (
            <Favourite_Outline height={'100%'} width={'100%'} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header isWhiteCart={true} />
      <SafeAreaView style={styles.mainContinerStyle}>
        <View style={styles.flex1}>
          <FlatList
            data={productsData?.products}
            numColumns={2}
            style={styles.flatlistStyle}
            renderItem={productRenderContainer}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContinerStyle: {flex: 1, backgroundColor: COLORS.WHITE},
  flex1: {flex: 1},
  flatlistStyle: {
    paddingHorizontal: 5,
    flex: 1,
  },
  renderContinerMainView: {
    backgroundColor: COLORS.OFF_WHITE,
    flex: 1,
    margin: 5,
    width: '100%',
    aspectRatio: 0.82,
    borderRadius: 10,
  },
  fastImageStyle: {
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
  detailMainView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  priceText: {fontSize: 16, fontWeight: '500'},
  titleText: {
    fontSize: 14,
  },
  plushIconStyle: {height: 30, aspectRatio: 1},
  favouriteIconStyle: {
    height: 20,
    aspectRatio: 1,
    position: 'absolute',
    marginTop: 10,
    marginLeft: 10,
  },
});
