// store.js
import { createStore } from 'redux';
import { darkModeReducer } from './reducers';

const store = createStore(darkModeReducer);

export default store;
