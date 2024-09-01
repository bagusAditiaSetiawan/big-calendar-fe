import BigCalendarComponent, {EventPayload} from "../../components/big-calendar/big-calendar.component";
import {useEffect, useState} from "react";
import {getAllEvent} from "../../services/event.service";
import AdminTemplate from "../../components/template/admin.template";
import {AxiosError} from "axios";
import {AuthenticationError} from "../../helpers/auth";
import {Bounce, toast} from "react-toastify"
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button} from "flowbite-react";

export default function DashboardPage() {
    const location = useLocation()
    const navigation = useNavigate()
    const [events, setEvents] = useState<EventPayload[]>([])
    useEffect(() => {
        getAllEvent().then(res => {
            const eventTransformed = res.data.data.map((event) => ({
                title: event.email,
                start: new Date(event.date),
                end: new Date(event.date),
                id: event.id,
            }))
            setEvents(eventTransformed)
        }).catch(err => {
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
    }, [location.pathname])

    const showEvent = (id: string) => {
        navigation(`/dashboard/event-detail/${id}`)
    }

    return (
        <>
            <AdminTemplate>
                <>
                <header className="bg-white shadow">
                    <div className="px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                        <Link to={"/dashboard/event-create"}>
                            <Button>Create</Button>
                        </Link>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <BigCalendarComponent events={events} showEvent={showEvent} />
                    </div>
                    <Outlet/>
                </main>
                </>
            </AdminTemplate>
        </>
    )
}
