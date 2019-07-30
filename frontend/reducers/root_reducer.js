import { entitiesReducer } from "./entities_reducers";
import { errorsReducer } from "./errors_reducer";
import { sessionReducer } from "./session_reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer
});

export default rootReducer;