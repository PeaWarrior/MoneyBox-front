import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import userReducer from '../components/user/userReducer';
import portfolioReducer from '../components/portfolio/portfolioReducer';
import activityReducer from '../components/activity/activityReducer';
import stockReducer from '../components/stock/stockReducer';
import stockChartReducer from '../components/stock/stockChartReducer';

const rootReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
    stock: stockReducer,
    stockChart: stockChartReducer,
    activity: activityReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );

export default store;