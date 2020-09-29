import moment from 'moment';
import { getIntradayPricesRequest } from '../../api';

export const setIntradayChart = (ticker, openPrice) => {
    return function(dispatch) {
        dispatch(setIntradayTimes());
        getIntradayPricesRequest(ticker, openPrice)
            .then(data => {
                dispatch(getPricesAndSetPrices(data));
                dispatch(setDate(moment(data[0].date).format('MMM D, YYYY')));
            })
    }
};

export const setIntradayTimes = () => {
    return function(dispatch) {
        const intradayTimes = Array.from({
            length: 391
            }, 
            (_, minute) => moment({
                hour: Math.floor(((minute + 30) / 60) + 9),
                minutes: (minute+30) % 60
                })
                .format('hh:mm A')
        )
        dispatch(setTimes(intradayTimes));
    }
};

export const setTimes = (times) => {
    return {
        type: 'SET_TIMES',
        payload: times
    }
};

export const setPrices = (prices) => {
    return {
        type: 'SET_PRICES',
        payload: prices
    }
};

export const setBorderColor = (newColor) => {
    return {
        type: 'SET_BORDER_COLOR',
        payload: newColor
    }
};

export const setDate = (date) => {
    return {
        type: 'SET_DATE',
        payload: date
    }
};

// UTILITY

export const getPricesAndSetPrices = (data) => {
    return function(dispatch) {
        let prevPrice;
        const prices = data.map(intradayTrade => {
            if (intradayTrade.average) {
                prevPrice = intradayTrade.average
                return prevPrice
            } else {
                return prevPrice
            }
        });
        dispatch(setPrices(prices));
    }
}