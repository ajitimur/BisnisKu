import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

export const store = createStore(
  applyMiddleware(reduxThunk)
);
