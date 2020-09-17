const defaultState = {
    currentUser: null,
    form: {
        username: '',
        password: '',
        password_confirmation: '',
    }
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_INPUT':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            }
        case 'CLEAR_FORM':
            return {
                ...state,
                form: {
                    username: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                currentUser: null,
                form: {
                    username: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        default:
            return state;
    }
}

export default reducer;