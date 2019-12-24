import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./config/store"; // Configuration
import Main from "./components/Main/view";
import './App.css';

/**
 * Componente puro principal App
 * @version        1.0.0 - 26 Jun 2018
 * @returns {JSX} : Componente App
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Main} />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
