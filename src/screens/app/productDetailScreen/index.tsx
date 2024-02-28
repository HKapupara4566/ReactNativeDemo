import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getProductDetails} from '../../../services/product';
import {Header} from '../../../components/Header';
import {COLORS} from '../../../utils/colors';
import FastImage from 'react-native-fast-image';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {setCartItemData} from '../../../helper/storage';
import {setCartArr} from '../../../store/actions/app';
import Toast from 'react-native-simple-toast';

const ProductDetailScreen: React.FC = ({route}) => {
  let selectedProductData = route?.params?.productData;
  const [selectedProductDetail, setSelectedProductDetail] = useState({});
  const cartArr = useSelector(state => state?.app?.cartArr ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getSelectedProductDetail();
  }, []);

  const getSelectedProductDetail = () => {
    setIsLoading(true);
    getProductDetails(selectedProductData?.id)
      .then(res => {
        setSelectedProductDetail(res?.data);
      })
      .catch(err => {
        console.log('getProductDetails err ==>', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  return (
    <View style={styles.mainViewStyle}>
      <Header isBackButton={true} headerBG={COLORS.WHITE} />
      <Text style={styles.titleTextStyle}>{selectedProductDetail?.title}</Text>
      <Text style={styles.branchTextStyle}>
        {selectedProductDetail?.brand} {selectedProductDetail?.category}
      </Text>

      <View style={styles.ratingViewStyle}>
        <Rating
          startingValue={selectedProductDetail?.rating}
          type="custom"
          ratingColor={COLORS.DARK_YELLOW}
          ratingBackgroundColor={COLORS.RATING_GRAY}
          ratingCount={5}
          imageSize={20}
        />
      </View>

      <View>
        <FlatList
          horizontal
          pagingEnabled
          ref={flatListRef}
          style={styles.flatlistStyle}
          onViewableItemsChanged={({viewableItems, changed}) =>
            setSelectedIndex(viewableItems?.[0]?.index)
          }
          data={selectedProductDetail?.images}
          renderItem={({item, index}) => {
            return (
              <View style={styles.renderContinerMainView}>
                <FastImage
                  style={styles.fadstImageStyle}
                  source={{
                    uri: item,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.productDetailMainView}>
          {selectedProductDetail?.images?.map((el, ietmIndex) => {
            return (
              <View
                style={[
                  styles.sliderDorStyle,
                  {
                    backgroundColor:
                      selectedIndex == ietmIndex
                        ? COLORS.DARK_YELLOW
                        : COLORS.TEXT_GRAY,
                  },
                ]}></View>
            );
          })}
        </View>
      </View>

      <View style={styles.pricingMainView}>
        <Text style={styles.priceText}>$ {selectedProductDetail?.price}</Text>
        <View style={styles.discountViewStyle}>
          <Text style={styles.discountTextStyle}>
            {selectedProductDetail?.discountPercentage}% OFF
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onAddToCartPress(selectedProductDetail)}
        style={styles.addToCartButton}>
        <Text style={styles.addtoCartText}>Add To Cart</Text>
      </TouchableOpacity>

      <Text style={styles.detailText}>Details</Text>

      <Text style={styles.discriptionText}>
        {selectedProductDetail?.description}
      </Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  mainViewStyle: {flex: 1, backgroundColor: COLORS.WHITE},
  titleTextStyle: {fontSize: 30, fontWeight: '700', paddingHorizontal: 20},
  branchTextStyle: {fontSize: 22, fontWeight: '500', paddingHorizontal: 20},
  ratingViewStyle: {
    alignItems: 'flex-start',
    marginLeft: 15,
    flexDirection: 'row',
    marginTop: 10,
  },
  flatlistStyle: {marginVertical: 10},
  renderContinerMainView: {
    width: Dimensions.get('screen').width,
    aspectRatio: 1.6,
  },
  fadstImageStyle: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
  productDetailMainView: {
    position: 'absolute',
    bottom: 45,
    flexDirection: 'row',
    marginLeft: 15,
  },
  sliderDorStyle: {
    height: 3,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  pricingMainView: {flexDirection: 'row'},
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 20,
    color: COLORS.PURPLE,
  },
  discountViewStyle: {
    marginLeft: 10,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 50,
  },
  discountTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 10,
    color: COLORS.WHITE,
  },
  addToCartButton: {
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 20,
    marginTop: 20,
    borderColor: COLORS.PURPLE,
  },
  addtoCartText: {fontSize: 16, color: COLORS.PURPLE},
  detailText: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '400',
    paddingHorizontal: 20,
  },
  discriptionText: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '400',
    paddingHorizontal: 20,
    color: '#8891A5',
  },
});
