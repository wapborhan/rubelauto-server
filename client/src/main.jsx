import React from "react";
import ReactDOM from "react-dom/client";
// import "./assets/styles.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import AuthProvider from "./provider/AuthProvider";
// import store from "./redux/store";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/shared/Loading";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AuthProvider>
          <RouterProvider router={routes}></RouterProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
