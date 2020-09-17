import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import portfolioReducer from './portfolioReducer';

const rootReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );

export default store;