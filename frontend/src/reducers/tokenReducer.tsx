export interface tokenState {
    token: any
}

const initialState = {
    token: null,
}

type Action = { type: 'SET_TOKEN'; payload: any }

export const tokenReducer = (state: tokenState = initialState, action: any) => {
    switch (action.type) {
        case 'SET_TOKEN': {
            return { ...state, token: [action.payload] }
        }
        case 'DELETE_TOKEN': {
            return { ...state, token: [null] }
        }
        default:
            return state
    }
}
