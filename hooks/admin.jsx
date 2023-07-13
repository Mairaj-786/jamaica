import axios from "axios"
import { toast } from "react-toastify"
import { baseUrl, config } from "./baseUrl"

export const addNewsMethod = async (data) => {
    if (!data.title) {
        !data.title && toast.error('Title is required')
        !data.description && toast.error('Description is required')
        !data.body_image && toast.error('Body image is required')
        !data.main_image && toast.error('Main image is required')
    } else {
        try {
            const res = await axios.post(`${baseUrl}/news/create-news`, data, config)
            console.log('data', res.data)
            toast.success('news  created.')
            return res
        } catch (error) {
            console.log({ error })
        }
    }
}
export const addBadWordMethod = async (data, setLoading) => {
    setLoading(true)
    if (!data.words) {
        toast.error('Add atleasr one word !')
        setLoading(false)
    } else {
        setLoading(true)
        try {
            const res = await axios.patch(`${baseUrl}/add-new-word`, data, config)
            console.log('data', res.data)
            toast.success('Word added!')
            setLoading(false)
            return res
        } catch (error) {
            setLoading(false)
            console.log({ error })
        }
    }
}
export const updateBadWordMethod = async (data, setLoading) => {
    setLoading(true)
    try {
        const res = await axios.patch(`${baseUrl}/update-words-list`, data, config)
        console.log('data', res.data)
        toast.success('Word updated!')
        setLoading(false)
        return res
    } catch (error) {
        setLoading(false)
        console.log({ error })
    }
}

export const updateStatusMethod = async (data, setLoading, id) => {
    setLoading(true)
    try {
        const res = await axios.patch(`${baseUrl}/events/update-event/${id}`, data, config)
        console.log('data', res.data)
        toast.success('Status updated !')
        setLoading(false)
        return res
    } catch (error) {
        setLoading(false)
        console.log({ error })

    }
}
export const deleteMutiUserMethod = async (data) => {
    try {
        const res = await axios.delete(`${baseUrl}/user/delete-multiple-users`, data, config)
        toast.success('Users Deleted', {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        console.log({ error })
    }
}
export const AddAdminMethod = async (data, setLoading) => {
    setLoading(true)
    try {
        const res = await axios.post(`${baseUrl}/auth/register`, data, config)
        setLoading(false)
        toast.success('Users Created', {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
        })
        setLoading(false)
        console.log({ error })
    }
}


export const updateImageSliderMethod = async (data, setLoading) => {
    try {
        setLoading(true)
        const res = await axios.patch(`${baseUrl}/update-home/63ef601322eb85ddf61c27a6`, data, config)
        setLoading(false)
        toast.success('data updated', {
            position: toast.POSITION.TOP_RIGHT,
        })
        // return res
    } catch (error) {
        setLoading(false)
        console.log({ error })
    }
}

export const doSendEmail = async (data, setLoading) => {
    try {
        setLoading(true)
        const res = await axios.post(`${baseUrl}/newsletter/send`, data, config)
        toast.success(res.data.message)
        setLoading(false)
        return res.data
    } catch (error) {
        setLoading(false)
        console.log({ error })

    }
}
export const getInstaData = async (setInstagram) => {
    try {
        const res = await axios.get(`${baseUrl}/instagram`)
        setInstagram(res.data)
    } catch (error) {
        console.log({ error })

    }
}

export const updateInstaPost = async (data, id) => {
    try {
        const res = await axios.patch(`${baseUrl}/instagram/${id}`, data)
        console.log('done', res)
        toast.success('Data updated')
        return res
    } catch (error) {
        console.log({ error })

    }
}