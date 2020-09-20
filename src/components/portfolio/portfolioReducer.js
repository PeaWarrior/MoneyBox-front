const defaultState = {
    portfolios: [],
    currentPortfolio: {},
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
                    ...state.portfolios,
                    ...action.payload
                ]
            }
        case 'SET_CURRENT_PORTFOLIO':
            return {
                ...state,
                currentPortfolio: action.payload
            }
        default:
            return state;
    }
}

export default reducer;