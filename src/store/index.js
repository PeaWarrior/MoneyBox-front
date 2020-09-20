import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import userReducer from '../components/user/userReducer';
import portfolioReducer from '../components/portfolio/portfolioReducer';
import activityReducer from '../components/activity/activityReducer';
import stockReducer from '../components/stock/stockReducer';

const rootReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
    stock: stockReducer,
    activity: activityReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );

export default store;