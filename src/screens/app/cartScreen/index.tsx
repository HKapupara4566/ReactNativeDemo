import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../../components/Header';
import {COLORS} from '../../../utils/colors';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {setCartItemData} from '../../../helper/storage';
import {setCartArr} from '../../../store/actions/app';

const CartScreen: React.FC = () => {
  const cartArr = useSelector(state => state?.app?.cartArr ?? []);
  const dispatch = useDispatch();
  const [cartItemArr, setCartItemArr] = useState<any[]>([]);
  const deliveryCharge: number = 33;

  useEffect(() => {
    setCartItemArr(cartArr);
  }, [cartArr]);

  const onAddToCartPress = item => {
    let alreadyAddedData = cartArr?.find(el => el?.id == item?.id);
    if (alreadyAddedData?.id) {
      let cartItemDataArr: any[] = cartArr?.map(el => {
        if (el?.id == item?.id) {
          let updateData = {...el, qty: el?.qty + 1};
          return updateData;
        } else {
          return el;
        }
      });

      setCartItemData(JSON.stringify(cartItemDataArr));
      dispatch(setCartArr(cartItemDataArr));
    } else {
      let cartItemDataArr: any[] = [...cartArr, {...item, qty: 1}];

      setCartItemData(JSON.stringify(cartItemDataArr));
      dispatch(setCartArr(cartItemDataArr));
    }
  };

  const onRemoveItemFromCartPress = item => {
    let alreadyAddedData = cartArr?.find(el => el?.id == item?.id);
    if (alreadyAddedData?.qty > 1) {
      let cartItemDataArr: any[] = cartArr?.map(el => {
        if (el?.id == item?.id) {
          let updateData = {...el, qty: el?.qty - 1};
          return updateData;
        } else {
          return el;
        }
      });

      setCartItemData(JSON.stringify(cartItemDataArr));
      dispatch(setCartArr(cartItemDataArr));
    } else {
      let cartItemDataArr = cartItemArr?.filter(el => el?.id != item?.id);

      setCartItemData(JSON.stringify(cartItemDataArr));
      dispatch(setCartArr(cartItemDataArr));
    }
  };

  const totalAmmountOfCartItems = () => {
    let totalAmmount = 0;
    cartArr?.map(el => {
      totalAmmount = totalAmmount + el?.price * el.qty;
    });

    return totalAmmount;
  };
  const renderCartItemContainer = ({item, index}) => {
    return (
      <>
        <View style={styles.renderContainerMainView}>
          <View>
            <FastImage
              style={styles.fastImageStyle}
              source={{
                uri: item?.thumbnail,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={styles.itemTitleView}>
            <Text>{item?.title}</Text>
            <Text>$ {item?.price}</Text>
          </View>
          <View style={styles.plushMinusButtonView}>
            <TouchableOpacity
              onPress={() => onRemoveItemFromCartPress(item)}
              style={styles.minusButtonView}>
              <Text style={styles.minusText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyTextStyle}>{item?.qty}</Text>
            <TouchableOpacity
              onPress={() => onAddToCartPress(item)}
              style={styles.plushViewStyle}>
              <Text style={styles.minusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.underLine} />
      </>
    );
  };
  return (
    <View style={styles.mainContainerStyle}>
      <Header
        isBackButton={true}
        title={`Shopping Cart (${cartItemArr?.length})`}
        headerBG={COLORS.WHITE}
      />
      <View style={styles.flex1}>
        <FlatList data={cartItemArr} renderItem={renderCartItemContainer} />
      </View>
      {cartItemArr?.length > 0 && (
        <View style={styles.subTotalMainView}>
          <View style={styles.subTotalTextView}>
            <Text style={styles.subTotalTextStyle}>Subtotal</Text>
            <Text>${totalAmmountOfCartItems()}</Text>
          </View>
          <View style={styles.subTotalTextView}>
            <Text style={styles.subTotalTextStyle}>Delivery</Text>
            <Text>${deliveryCharge}</Text>
          </View>
          <View style={styles.subTotalTextView}>
            <Text style={styles.subTotalTextStyle}>Total</Text>
            <Text>${totalAmmountOfCartItems() + deliveryCharge}</Text>
          </View>

          <TouchableOpacity style={styles.proceedButtonStyle}>
            <Text style={styles.proceedButtonText}>Proceed To checkout</Text>
          </TouchableOpacity>
        </View>
      )}
      <SafeAreaView />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  flex1: {flex: 1},
  subTotalMainView: {
    backgroundColor: COLORS.OFF_WHITE,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  subTotalTextView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subTotalTextStyle: {color: COLORS.TEXT_GRAY, fontSize: 14, flex: 1},
  proceedButtonStyle: {
    width: '90%',
    backgroundColor: COLORS.PURPLE,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  proceedButtonText: {fontSize: 16, color: COLORS.WHITE, fontWeight: '600'},
  renderContainerMainView: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    marginVertical: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  fastImageStyle: {
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
  itemTitleView: {flex: 1, marginLeft: 10},
  plushMinusButtonView: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  minusButtonView: {
    height: '50%',
    aspectRatio: '1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.OFF_WHITE,
    borderRadius: 50,
    marginRight: 10,
  },
  minusText: {
    fontSize: 20,
  },
  qtyTextStyle: {fontSize: 14},
  plushViewStyle: {
    height: '50%',
    aspectRatio: '1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.OFF_WHITE,
    borderRadius: 50,
    marginLeft: 10,
  },
  underLine: {
    height: 2,
    width: '90%',
    backgroundColor: COLORS.OFF_WHITE,
    alignSelf: 'center',
  },
});
