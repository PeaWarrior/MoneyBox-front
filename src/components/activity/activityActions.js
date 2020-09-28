import store from '../../store';
import { createNewActivityRequest, sellActivityRequest } from '../../api';
// import { setStocks } from '../stock/stockActions';
import { setCurrentPortfolio } from '../portfolio/portfolioActions';

export const createAndFetchNewActivity = (form) => {
    return function(dispatch) {
        if (form.category === 'Sell') {
            sellActivityRequest(form)
            .then(data => {
                // const stocks = store.getState().stock.stocks
                // const updatedStocks = stocks.map(stock => {
                //     if (stock.name === data.stock.name) {
                //         return data.stock
                //     } else {
                //         return stock
                //     }
                // })
                // dispatch(setStocks(updatedStocks))
                const currentPortfolio = store.getState().portfolio.currentPortfolio
                dispatch(setCurrentPortfolio(data.portfolio))
            })
        } else {
            createNewActivityRequest(form)
            .then(data => {
                dispatch(createActivity(data.activity))
                dispatch(clearActivityForm());
            })
        }
    }
};

export const createActivity = (activityData) => {
    return {
        type: 'CREATE_ACTIVITY',
        payload: activityData
    }
}

export const setActivityInput = (inputData) => {
    return {
        type: 'SET_ACTIVITY_INPUT',
        payload: inputData
    };
};

export const clearActivityForm = () => {
    return {
        type: 'CLEAR_ACTIVITY_FORM'
    }
}