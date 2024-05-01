import { createAction, props } from "@ngrx/store";
import { SignUpCredentials, loginCredentials } from "../../models/auth";

export const getStudent = createAction(
    '[Student] fetch Request'
)

// export const studentLogin = createAction(
//     '[Student] login Request',
//     props<{userData : loginCredentials }>()
// )

export const fetchSuccess = createAction(
    '[Fetch] fetch Success',
    props<{successResponse : any}>()
)

export const fetchFail = createAction(
    '[Fetch] fetch failure',
    props<{error : string}>()
)