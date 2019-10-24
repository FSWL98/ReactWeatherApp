import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import WeatherHere from '../WeatherHere/WeatherHere'
import Favorites from "../Favorites/Favorites";
import {store} from '../../store/index'

function App() {
  return (
    <Provider store={store}>
      <WeatherHere />
      <Favorites/>

    </Provider>
  );
}

export default App;
