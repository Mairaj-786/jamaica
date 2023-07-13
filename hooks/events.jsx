import axios from "axios"
import { toast } from "react-toastify"
import { baseUrl, config } from "./baseUrl"

export const AddEventMethod = async (data, setLoading) => {
    if (!data.shortDescription) {
        !data.shortDescription && toast.error('Description is required')
    }
    if (!data.name) {
        !data.name && toast.error('eventName is required')
    }
    if (!data.category) {
        !data.category && toast.error('category is required')
    }
    if (!data.address) {
        !data.address && toast.error('Street Address is required')
    }
    // if (!data.endDate) {
    //     !data.endDate && toast.error('End of Date is required')
    // }
    if (!data.startDate) {
        !data.startDate && toast.error('Start of Date is required')
    }
    if (!data.firstName) {
        !data.firstName && toast.error('First Name is required')
    }
    if (!data.eventImage) {
        !data.eventImage && toast.error('Event Image is required')
    }
    if (!data.lastName) {
        !data.lastName && toast.error('Last Name is required')
    }
    if (!data.nameOfOrganization) {
        !data.nameOfOrganization && toast.error('Organisation Name is required')
    }
    if (!data.email) {
        !data.email && toast.error('Email is required')
    }
    if (!data.phoneNumber) {
        !data.phoneNumber && toast.error('Phone Number is required')
    }
    if (!data.ticketOutlet) {
        !data.ticketOutlet && toast.error('Ticket Outlet is required')
    }
    if (!data.activity) {
        !data.activity && toast.error('Event Activity is required')
    }
    if (!data.parish) {
        !data.parish && toast.error('Event Parish is required')
    }
    if (!data.startTime) {
        !data.startTime && toast.error('Start TimeEvent is required')
    }
    if (!data.endTime) {
        !data.endTime && toast.error('End TimeEvent is required')
    }
    if (!data.phoneNumberType) {
        !data.phoneNumberType && toast.error('Phone NumberType is required')
    }
    if (!data.ticketPrice) {
        !data.ticketPrice && toast.error('Ticket Price is required')
    }
    else {
        // !data.eventType && toast.error('Event Type is required')
        try {
            setLoading(true)
            let res = await axios.post(`${baseUrl}/events/create-event`, data, config)
            console.log('succe', res)
            if (res) {
                toast.success('Event created')
            }
            setLoading(false)

            return res
        } catch (error) {
            toast.error(error.response.data.err)
            setLoading(false)
            console.log({ error })
        }
    }
}


export const AddReview = async (data, setLoading) => {
    setLoading(true)
    try {
        const res = await axios.post(`${baseUrl}/events/create-review`, data, config)
        console.log('review', res.data)
        toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        setLoading(false)
        return res.data
    } catch (error) {
        setLoading(false)
        console.log({ error })
        toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}

export const getEvents = async (setReviewAll, id) => {
    try {
        const res = await axios.post(`${baseUrl}/events/get-reviews-of-event`, { "event": id }, config)
        setReviewAll(res.data)
    } catch (error) {
        console.log({ error })
    }
}
export const getAllEvents = async () => {
    try {
        const res = await axios.get(`${baseUrl}/events/get-events`, config)
        // setEvents(res.data)
        return res.data
    } catch (error) {
        console.log({ error })
    }
}
export const getSingleEvents = async (id, setIsLoading) => {
    try {
        setIsLoading(true)
        const res = await axios.get(`${baseUrl}/events/get-event/${id}`, config)
        // setEvents(res.data)
        console.log('single', res.data)
        setIsLoading(false)
        return res.data
    } catch (error) {
        setIsLoading(false)
        console.log({ error })
    }
}