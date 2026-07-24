import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store }  from "./app/store";
import { AppThemeProvider } from "./theme/AppThemeProvider";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          
            <App />
          
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>
);