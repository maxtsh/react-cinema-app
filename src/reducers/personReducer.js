import { GET_PERSON, GET_PERSON_CLEAR, PERSON_ERROR } from '../actions/types';

const initialState = {
    person: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PERSON:
            return{
                ...state,
                loading: false,
                person: action.payload,
            }

        case GET_PERSON_CLEAR:
            return{
                ...state,
                loading: true,
                person: null
            }

        case PERSON_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
};