import {createStore, applyMiddleware, Store} from 'redux';

import rootReducer from './reducers';
import {thunk} from 'redux-thunk';

// Define the root state type
type RootState = ReturnType<typeof rootReducer>;

// Create a middleware instance
const middleware = applyMiddleware(thunk);

// Create the store
const store: Store<RootState> = createStore(rootReducer, {}, middleware);

export {store};
