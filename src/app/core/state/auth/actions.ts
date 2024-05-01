import { createAction, props } from "@ngrx/store";
import { SignUpCredentials, loginCredentials } from "../../models/auth";

export const studentSignup = createAction(
    '[Student] signup Request',
    props<{userData : SignUpCredentials }>()
)

export const studentLogin = createAction(
    '[Student] login Request',
    props<{userData : loginCredentials }>()
)

export const submitSuccess = createAction(
    '[Submit] submit Success',
    props<{successResponse : any}>()
)

export const submitFail = createAction(
    '[Submit] submit failure',
    props<{error : string}>()
)