const defaultState = {
    date: null,
    graphData: {
        labels: [],
        datasets: [{
            data: [],
            clip: 0,
            fill: false,
            lineTension: 0.1,
            borderColor: null,
            borderCapStyle: 'round',
            pointRadius: 0
        }]
    }
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TIMES':
            return {
                ...state,
                graphData: {
                    ...state.graphData,
                    labels: [...action.payload]
                }
            }
        case 'SET_PRICES':
            return {
                ...state,
                graphData: {
                    ...state.graphData,
                    datasets: [{
                        ...state.graphData.datasets[0],
                        data: [...action.payload]
                    }]
                }
            }
        case 'SET_BORDER_COLOR':
            return {
                ...state,
                graphData: {
                    ...state.graphData,
                    datasets: [{
                        ...state.graphData.datasets[0],
                        borderColor: action.payload
                    }]
                }
            }
        case 'SET_DATE':
            return {
                ...state,
                date: action.payload
            }
        default:
            return state;
    }
};

export default reducer;