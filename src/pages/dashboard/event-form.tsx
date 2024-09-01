import {Label, Textarea, TextInput} from "flowbite-react";
import moment from "moment/moment";
import {IEvent} from "../../services/event.service";

interface Props {
    data: IEvent,
    setData:  React.Dispatch<React.SetStateAction<IEvent>>
}

export default function ({data, setData}: Props) {
    return (
        <div className="space-y-6">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" />
                </div>
                <TextInput id="email" type="email" onChange={(e) => setData((data) => ({
                    ...data,
                    email: e.target.value
                }))} value={data.email} required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="date" />
                </div>
                <TextInput id="date" type="date" onChange={(e) => setData((data) => ({
                    ...data,
                    date: new Date(e.target.value)
                }))}  value={moment(data.date).format("YYYY-MM-DD")} required shadow />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="body" />
                </div>
                <Textarea id="body" onChange={(e) => setData((data) => ({
                    ...data,
                    body: e.target.value
                }))}   value={data.body} required shadow />
            </div>
        </div>
    )
}