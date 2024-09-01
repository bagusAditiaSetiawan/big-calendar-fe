import {client} from "./client.service";
import {getToken} from "../helpers/token";


export interface SignInPayload {
    email: string
    password: string
}



export interface SignUpPayload {
    email: string
    password: string
}




export function signIn(payload :SignInPayload) {
    return client.post("/auth/signin", {
        ...payload
    })
}

export function signUp(payload :SignUpPayload) {
    return client.post("/auth/signup", {
        ...payload
    })
}

export function signOut() {
    return client.post("/auth/logout", {}, {
        headers: {
            ...getHeaderAuthorization()
        }
    })
}
export function getHeaderAuthorization() {
    return {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    }
}