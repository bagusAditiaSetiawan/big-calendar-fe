

export function getToken() {
    return localStorage.getItem("token")
}


export function setToken(token: string) {
    return localStorage.setItem("token", token)
}

export function clearToken() {
    return localStorage.removeItem("token")
}