import 'react-native-gesture-handler';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {getCartItemData, getFavouriteItemData} from './src/helper/storage';
import {setCartArr, setFavouriteArr} from './src/store/actions/app';

const App: React.FC = () => {
  React.useEffect(() => {
    getAllDataFromLocalStorageAndSet();
  }, []);

  const getAllDataFromLocalStorageAndSet = async () => {
    let favouriteDataArr: string = await getFavouriteItemData();
    let cartDataArr: string = await getCartItemData();
    store.dispatch(setFavouriteArr(JSON.parse(favouriteDataArr)));
    store.dispatch(setCartArr(JSON.parse(cartDataArr)));
  };
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
