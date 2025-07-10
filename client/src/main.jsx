// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter
// import "./index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./store/store";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//     <Provider store={store}>

//       <App />
//     </Provider>
//     </BrowserRouter>
//   </StrictMode>
// );


import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store, persistor } from "./store/store"; // adjust path if needed
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
