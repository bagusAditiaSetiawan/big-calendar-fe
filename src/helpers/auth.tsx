import {AxiosError} from "axios";
import {clearToken} from "./token";


export function AuthenticationError(err :AxiosError) {
    if(err.status === 403 || err.status === 401) {
        clearToken()
    }
}