import axios from "axios"


const {VITE_APP_BASE_URL_API = ""} = import.meta.env



export const client = axios.create({
    baseURL: VITE_APP_BASE_URL_API
})
