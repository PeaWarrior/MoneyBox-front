import store from '.';

export const signupUser = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store.getState().user.form)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.user) {
                const action = {
                    type: 'CLEAR_FORM'
                }
                dispatch(action);
            } else {
                console.log(data.error)
            }
        })
    }
};

export const loginUser = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store.getState().user.form)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.user) {
                const action = {
                    type: 'CLEAR_FORM'
                }
                dispatch(action);
            } else {
                console.log(data.error)
            }
        })
    }
};

export const autologin = () => {
    return function(dispatch) {
        fetch('http://localhost:3001/autologin', {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.user) {
                const action = {
                    type: 'CLEAR_FORM'
                }
                dispatch(action);
            } else {
                console.log(data.error)
            }
        });
    };
};

export const logout = () => {
    return function(dispatch) {
        const action = {
            type: 'LOGOUT'
        };
        localStorage.clear();
        dispatch(action);
    }
}