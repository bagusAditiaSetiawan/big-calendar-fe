import {Modal, Button,} from "flowbite-react";
import {useNavigate, useParams} from "react-router-dom";
import {useGetEventHook} from "../../hooks/get-event.hook";
import EventForm from "./event-form";
import {updateEvent} from "../../services/event.service";
import {Bounce, toast} from "react-toastify";
import {AxiosError} from "axios";
import {AuthenticationError} from "../../helpers/auth";
import {FormEvent, useState} from "react";
export default function () {
    const {id} = useParams()
    const navigation = useNavigate()
    const {data, setData} = useGetEventHook()
    const backDashboard = () => {
        navigation(`/dashboard/event-detail/${id}`)
    }
    const [loading, setLoading] = useState(false)
    const submitHandler = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        updateEvent({...data}).then(() => {
            toast.success('Update event is success', {
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
            setTimeout(() => {
                navigation("/dashboard")
            }, 1000)
        }).catch((err) => {
            if(err instanceof AxiosError) {
                AuthenticationError(err)
                if(err.status === 400) {
                    toast.error(err.response?.data?.errors[0]?.message)
                }
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
        }).finally(() => setLoading(false))
    }
    return  <Modal show={true} onClose={() => backDashboard()} >
        <form onSubmit={submitHandler}>
            <Modal.Header>Update Event</Modal.Header>
            <Modal.Body>
                <EventForm data={data} setData={setData} />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} type="submit">Submit</Button>
                <Button color="gray" onClick={() => {
                    backDashboard()
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
}