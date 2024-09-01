import {Modal, Button, Label, TextInput, Textarea} from "flowbite-react";
import {useNavigate} from "react-router-dom";
import moment from "moment"
import {useGetEventHook} from "../../hooks/get-event.hook";
import {deleteEvent, sendEventEmail} from "../../services/event.service";
import {Bounce, toast} from "react-toastify";
import {AxiosError} from "axios";
import {AuthenticationError} from "../../helpers/auth";
export default function () {
    const navigation = useNavigate()
    const {data} = useGetEventHook()
    const backDashboard = () => {
        navigation("/dashboard")
    }

    const sendEmail = () => {
        sendEventEmail(data.id).then(() => {
            toast.success('Send email event is success', {
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
        })
    }
    const deleteEventHandler = () => {
        deleteEvent(data.id).then(() => {
            toast.success('Delete email event is success', {
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
        })
    }
    return  <Modal show={true} onClose={() => backDashboard()} >
        <Modal.Header>Event</Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" />
                    </div>
                    <TextInput id="email" type="email" disabled value={data.email} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="date" />
                    </div>
                    <TextInput id="date" type="date" disabled value={moment(data.date).format("YYYY-MM-DD")} required shadow />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="body" />
                    </div>
                    <Textarea id="body"  disabled value={data.body} required shadow />
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => navigation(`/dashboard/event-update/${data.id}`)}>Update</Button>
            <Button color="success"  onClick={() => sendEmail()}>Send Email</Button>
            <Button color="red"  onClick={() => deleteEventHandler()}>Delete</Button>
            <Button color="gray" onClick={() => {
                backDashboard()
            }}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
}