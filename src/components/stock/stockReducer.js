const defaultState = {
    stocks: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_STOCKS':
            return {
                stocks: [...action.payload]
            }
        default:
            return state;
    }
};

export default reducer;