import {client} from "./client.service";
import {getHeaderAuthorization} from "./auth.service";

export interface IEvent {
    id: string;
    email: string;
    date: Date;
    body: string;
}

export interface CreateEvent {
    email: string;
    date: Date;
    body: string;
}
export interface UpdateEvent {
    id: string;
    email: string;
    date: Date;
    body: string;
}


export interface ResponseEventPaginate {
    data: IEvent[]
}


export interface ResponseEvent {
    data: IEvent
}


export function getAllEvent() {
    return client.get<ResponseEventPaginate>("/event", {
        headers: {
            ...getHeaderAuthorization()
        }
    })
}

export function getEvent(id: string) {
    return client.get<ResponseEvent>(`/event/${id}`, {
        headers: {
            ...getHeaderAuthorization()
        }
    })
}

export function createEvent(payload :CreateEvent) {
    return client.post<ResponseEvent>(`/event/`, payload, {
        headers: {
            ...getHeaderAuthorization()
        }
    })
}

export function updateEvent(payload :UpdateEvent) {
    return client.put<ResponseEvent>(`/event`, payload, {
        headers: {
            ...getHeaderAuthorization()
        }
    })
}

export function deleteEvent(id: string) {
    return client.delete<ResponseEvent>(`/event/${id}`, {
        headers: {
            ...getHeaderAuthorization()
        }
    })
}
export function sendEventEmail(id: string) {
    return client.post<ResponseEvent>(`/event/send-email/${id}`, {},{
        headers: {
            ...getHeaderAuthorization()
        }
    })
}