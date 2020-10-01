const defaultState = {
    portfolios: [],
    currentPortfolio: {
        stocks: []
    },
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATE_PORTFOLIO':
            return {
                ...state,
                portfolios: [
                    ...state.portfolios,
                    action.payload
                ]
            }
        case 'SET_PORTFOLIOS':
            return {
                ...state,
                portfolios: [
                    ...action.payload
                ]
            }
        case 'SET_CURRENT_PORTFOLIO':
            return {
                ...state,
                currentPortfolio: {
                    ...action.payload
                }
            }
        case 'CLEAR_PORTFOLIOS':
            return {
                portfolios: [],
                currentPortfolio: {},
            }
        case 'UPDATE_CURRENT_PORTFOLIO_STOCKS':
            return {
                ...state,
                currentPortfolio: {
                    ...state.currentPortfolio,
                    stocks: [...action.payload]
                }
            }
        default:
            return state;
    }
}

export default reducer;