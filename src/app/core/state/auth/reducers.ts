import { createReducer, on } from "@ngrx/store";
import { submitFail } from "./actions";

export interface AuthState {
    token: string | null;
    // user : UserModel | null,
    error: string | null;
}


export const initialState: AuthState = {
    token: null,
    // user : null
    error: null,
}

export const authReducer = createReducer(
    initialState,
    on(submitFail, (state, { error }) => {
        console.log('Error state updated:', error);
        return { ...state, error }
    })
);