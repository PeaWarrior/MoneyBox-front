import moment from 'moment';
import { getIntradayPricesRequest, getWeekPricesRequest, getMonthPricesRequest } from '../../api';

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

export const setWeekChart = (ticker) => {
    return function(dispatch) {
        getWeekPricesRequest(ticker)
            .then(data => {
                dispatch(getLabelsAndSetTimes(data))
                dispatch(getPricesAndSetPrices(data));
                dispatch(setDate(moment(data[data.length-1].date).format('MMM D, YYYY')));
            })
    }
};

export const setMonthChart = (ticker, period = 1) => {
    return function(dispatch) {
        getMonthPricesRequest(ticker, period)
            .then(data => {
                dispatch(getLabelsAndSetTimes(data))
                dispatch(getPricesAndSetPrices(data));
                dispatch(setDate(moment(data[data.length-1].date).format('MMM D, YYYY')));
            })
    }
};

export const getLabelsAndSetTimes = (data) => {
    return function(dispatch) {
        const times = data.map(candle => {
            return moment(candle.datetime).format('hh:mm A - MMM D, YYYY')
        })
        dispatch(setTimes(times));
    }
};

// REDUCER METHODS

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
        const prices = data.map(candle => {
            if (candle.close) {
                prevPrice = candle.close
                return prevPrice
            } else {
                return prevPrice
            }
        });
        dispatch(setPrices(prices));
    }
};

export const verticleLinePlugin = (chart) => {
    return function(dispatch) {
        return {
            afterDraw: function(chart) {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const activePoint = chart.controller.tooltip._active[0];
                    const ctx = chart.ctx;
                    const x = activePoint.tooltipPosition().x;
                    const topY = chart.legend.bottom;
                    const bottomY = chart.chartArea.bottom;
        
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'grey';
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }
}