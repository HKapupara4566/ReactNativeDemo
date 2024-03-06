import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import Plush_Icon from "../assets/svg/Plush_Icon.svg";
import Favourite_Filed from "../assets/svg/Favourite_Filed.svg";
import Favourite_Outline from "../assets/svg/Favourite_Outline.svg";
import { COLORS } from "../utils/colors";
import navigationRoutes from "../constants/navigationRoutes";

export const ProductRenderContainer = ({
  favouriteArr,
  item,
  index,
  onFavouritePress = () => {},
  onAddToCartPress = () => {},
}) => {
  let alreadyAddedData = favouriteArr?.find((el) => el?.id == item?.id);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation?.navigate(navigationRoutes.productDetailScreen, {
          productData: item,
        })
      }
      style={styles.renderContinerMainView}
    >
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
          style={styles.plushIconStyle}
        >
          <Plush_Icon height={"100%"} width={"100%"} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          onFavouritePress(item);
        }}
        style={styles.favouriteIconStyle}
      >
        {!!alreadyAddedData ? (
          <Favourite_Filed height={"100%"} width={"100%"} fill={"red"} />
        ) : (
          <Favourite_Outline height={"100%"} width={"100%"} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContinerStyle: { flex: 1, backgroundColor: COLORS.WHITE },
  flex1: { flex: 1 },
  flatlistStyle: {
    paddingHorizontal: 5,
    flex: 1,
  },
  renderContinerMainView: {
    backgroundColor: COLORS.OFF_WHITE,
    margin: 5,
    width: Dimensions.get("screen").width * 0.45,
    aspectRatio: 0.82,
    borderRadius: 10,
  },
  fastImageStyle: {
    width: "80%",
    flex: 1,
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 5,
  },
  detailMainView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  priceText: { fontSize: 16, fontWeight: "500" },
  titleText: {
    fontSize: 14,
  },
  plushIconStyle: { height: 30, aspectRatio: 1 },
  favouriteIconStyle: {
    height: 20,
    aspectRatio: 1,
    position: "absolute",
    marginTop: 10,
    marginLeft: 10,
  },
});
