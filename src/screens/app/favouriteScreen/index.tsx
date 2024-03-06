import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ProductRenderContainer } from "../../../components/ProductRenderContainer";
import { setCartItemData, setFavouriteItemData } from "../../../helper/storage";
import { setCartArr, setFavouriteArr } from "../../../store/actions/app";
import Toast from "react-native-simple-toast";
import { Header } from "../../../components/Header";

const FavouriteScreen: React.FC = () => {
  const favouriteArr = useSelector((state) => state?.app?.favouriteArr ?? []);
  const cartArr = useSelector((state) => state?.app?.cartArr ?? []);
  const [favouriteDataArr, setFavouriteDataArr] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setFavouriteDataArr(favouriteArr);
  }, [favouriteArr]);

  const onFavouritePress = (item) => {
    let alreadyAddedData = favouriteArr?.find((el) => el?.id == item?.id);
    if (alreadyAddedData?.id) {
      let newArrWithoutSelectedData = favouriteArr?.filter(
        (el) => el?.id != item?.id
      );

      setFavouriteItemData(JSON.stringify(newArrWithoutSelectedData));
      dispatch(setFavouriteArr(newArrWithoutSelectedData));
    } else {
      let favouriteProductArr = [...favouriteArr, item];

      setFavouriteItemData(JSON.stringify(favouriteProductArr));
      dispatch(setFavouriteArr(favouriteProductArr));
    }
  };

  const onAddToCartPress = (item) => {
    let alreadyAddedData = cartArr?.find((el) => el?.id == item?.id);
    if (alreadyAddedData?.id) {
      let quantity;
      let cartItemDataArr: any[] = cartArr?.map((el) => {
        if (el?.id == item?.id) {
          let updateData = { ...el, qty: el?.qty + 1 };
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
      let cartItemDataArr: any[] = [...cartArr, { ...item, qty: 1 }];

      setCartItemData(JSON.stringify(cartItemDataArr));
      dispatch(setCartArr(cartItemDataArr));
    }
  };
  return (
    <View style={styles.mainVeiwStyle}>
      <Header isWhiteCart={true} mainTitle="Favourites" />
      <View style={styles.listMainView}>
        <FlatList
          data={favouriteDataArr}
          numColumns={2}
          style={styles.flatlistStyle}
          renderItem={({ item, index }) => (
            <ProductRenderContainer
              favouriteArr={favouriteArr}
              item={item}
              index={index}
              onFavouritePress={(data) => onFavouritePress(data)}
              onAddToCartPress={(data) => onAddToCartPress(data)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  flatlistStyle: {
    paddingHorizontal: 5,
  },
  mainVeiwStyle: { flex: 1, width: "100%" },
  listMainView: { alignItems: "center", flex: 1 },
});
