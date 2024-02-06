import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "entities";

import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch);

export const withStore = (component: () => React.ReactNode) => () => <Provider store={store}>{component()}</Provider>;
