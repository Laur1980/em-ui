import * as actionTypes from "../actions";
const initialState = {
    budget: 0
};

const updateBudget = persons => {
    if(!persons || !Array.isArray(persons) || persons.length === 0 ){
        return  initialState;
    }
    const currentBudget = persons.reduce((acumulator, person ) => acumulator + person.salary, 0);
    return {
        budget: currentBudget
    };
};

const budgetReducer = (state = initialState, action) => {
    const type = action.type;
    switch(type){
        case actionTypes.UPDATE_TOTAL_BUDGET: return updateBudget(action.persons);
        default: return state;
    }
};

export default budgetReducer;