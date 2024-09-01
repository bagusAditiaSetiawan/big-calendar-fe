import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getEvent, IEvent} from "../services/event.service";
import {AxiosError} from "axios";
import {AuthenticationError} from "../helpers/auth";
import {Bounce, toast} from "react-toastify";


export const useGetEventHook = () => {
    const { id } = useParams()
    const [data, setData] = useState<IEvent>({
        email: "",
        date: new Date(),
        id: "",
        body: ""
    })


    useEffect(() => {
        if(id) {
            getEvent(id).then((res) => {
                setData((data) => ({
                    ...data,
                    email: res.data.data.email,
                    id: res.data.data.id,
                    body: res.data.data.body,
                    date: res.data.data.date,
                }))
            }).catch((err) => {
                if(err instanceof AxiosError) {
                    AuthenticationError(err)
                } else {
                    toast.error('Something internal error', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            })
        }

    }, [id])
    return {
        data, setData
    }
}