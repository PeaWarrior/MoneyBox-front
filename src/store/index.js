import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import userReducer from '../components/user/userReducer';
import portfolioReducer from '../components/portfolio/portfolioReducer';
import transactionReducer from '../components/transaction/transactionReducer';

const rootReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
    transaction: transactionReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );

export default store;