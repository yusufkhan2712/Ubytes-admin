import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./rootReducer";
import reduxThunk from "redux-thunk";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancers = composeEnhancers(
  applyMiddleware(reduxThunk, logger)
  /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
);

const persistedReducer = persistReducer(persistConfig, reducer);

// let store = createStore(persistedReducer, undefined, enhancers);
let store = createStore(reducer, undefined, enhancers);

let persistor = persistStore(store);

export { store, persistor };
