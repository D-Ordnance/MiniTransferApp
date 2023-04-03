import React from "react"
import { Provider } from "react-redux"
import { store } from "./src/store/index"
import Home from "./src/transfer/screen/home"
import { RootSiblingParent } from "react-native-root-siblings";
import AppContainer from "./src/transfer/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <AppContainer/>
      </RootSiblingParent>
    </Provider>
  );
}