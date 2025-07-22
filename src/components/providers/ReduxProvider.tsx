"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./ThemeProvider";
import { persistor, store } from "../../app/redux/store";

interface Props {
  children: ReactNode;
}

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>{children}</ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
