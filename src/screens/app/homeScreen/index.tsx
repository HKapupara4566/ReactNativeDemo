import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getAllProducts } from "../../../services/product";
import { COLORS } from "../../../utils/colors";
import { Header } from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { setCartItemData, setFavouriteItemData } from "../../../helper/storage";
import { useDispatch, useSelector } from "react-redux";
import { setCartArr, setFavouriteArr } from "../../../store/actions/app";
import Toast from "react-native-simple-toast";
import { ProductRenderContainer } from "../../../components/ProductRenderContainer";
import { perfectSize } from "../../../utils/mixins";

const HomeScreen: React.FC = () => {
  const [productsData, setProductsData] = useState<object>({});
  const favouriteArr = useSelector((state) => state?.app?.favouriteArr ?? []);
  const cartArr = useSelector((state) => state?.app?.cartArr ?? []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProductsData();
  }, []);

  const getAllProductsData = () => {
    getAllProducts()
      .then((res) => {
        setProductsData(res?.data);
      })
      .catch((error) => {
        console.log("getAllProducts error ==> ", error);
      });
  };
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
    <>
      <Header isWhiteCart={true} />
      <SafeAreaView style={styles.mainContinerStyle}>
        <View style={{ flex: false }}>
          <FlatList
            horizontal
            data={[1, 2, 3]}
            showsHorizontalScrollIndicator={false}
            renderItem={() => {
              return (
                <View style={styles.carosalMainView}>
                  <View style={styles.imageView}></View>
                  <View style={styles.offerTextMainView}>
                    <Text style={styles.getText}>Get</Text>
                    <Text style={styles.offTextStyle}>50% OFF</Text>
                    <Text style={styles.orderTextStyle}>On first 03 order</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.recommendedTextStyle}>Recommended</Text>
          <FlatList
            data={productsData?.products}
            numColumns={2}
            renderItem={({ item, index }) => (
              <ProductRenderContainer
                favouriteArr={favouriteArr}
                item={item}
                index={index}
                onFavouritePress={(data) => {
                  onFavouritePress(data);
                }}
                onAddToCartPress={(data) => {
                  onAddToCartPress(data);
                }}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContinerStyle: { flex: 1, backgroundColor: COLORS.WHITE },
  flex1: { flex: 1, alignItems: "center" },
  flatlistStyle: {
    paddingHorizontal: perfectSize(5),
    flex: 1,
  },
  renderContinerMainView: {
    backgroundColor: COLORS.OFF_WHITE,
    flex: 1,
    margin: perfectSize(5),
    width: "100%",
    aspectRatio: 0.82,
    borderRadius: perfectSize(20),
  },
  fastImageStyle: {
    width: "80%",
    flex: 1,
    alignSelf: "center",
    marginTop: perfectSize(15),
    borderRadius: perfectSize(5),
  },
  detailMainView: {
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(10),
    marginTop: perfectSize(10),
    flexDirection: "row",
  },
  priceText: { fontSize: 16, fontWeight: "500" },
  titleText: {
    fontSize: 14,
  },
  plushIconStyle: { height: perfectSize(30), aspectRatio: 1 },
  favouriteIconStyle: {
    height: perfectSize(20),
    aspectRatio: 1,
    position: "absolute",
    marginTop: perfectSize(10),
    marginLeft: perfectSize(10),
  },
  recommendedTextStyle: {
    fontSize: 25,
    width: "100%",
    marginLeft: perfectSize(25),
    marginVertical: perfectSize(10),
  },
  carosalMainView: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F9B023",
    alignSelf: "flex-start",
    padding: 10,
  },
  imageView: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 10,
    marginRight: 10,
    borderColor: COLORS.WHITE,
  },
  offerTextMainView: { justifyContent: "space-between" },
  getText: { fontSize: 18, color: COLORS.WHITE },
  offTextStyle: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: "700",
  },
  orderTextStyle: { fontSize: 16, color: COLORS.WHITE },
});
