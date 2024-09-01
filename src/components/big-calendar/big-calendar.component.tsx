import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import {useCallback, useEffect, useRef} from "react";

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export interface EventPayload {
    id: string,
    title: string,
    start: Date,
    end: Date,
}

interface Props {
    events: EventPayload[],
    showEvent: (id: string) => void,
}

const MyCalendar = ({ events, showEvent }: Props) => {
    const clickRef = useRef(null)

    useEffect(() => {
        return () => {
            if(clickRef.current) {
                window.clearTimeout(clickRef.current)
            }
        }
    }, [])

    const onSelectEvent = useCallback((calEvent :EventPayload) => {
        showEvent(calEvent.id)
    }, [])
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={[
                        ...events,
                ]}
                onSelectEvent={onSelectEvent}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
)

}
export default MyCalendar