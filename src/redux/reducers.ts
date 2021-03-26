import { combineReducers } from "redux";
import { searchs } from "../config";


interface Action {
    type: string,
    content: string
}
function createReducer(type: string) {

    return function (state = '', action: Action) {
        if (action.type === type) return action.content || '';
        return state;
    };
};
interface Accumulator {
    [key: string]: ReturnType<typeof createReducer>
}
const reducer = (accumulator: Accumulator, currentValue: string) => ({ ...accumulator, [currentValue]: createReducer(currentValue) });
export const rootReducer = combineReducers(
    searchs.reduce(reducer, {})
)