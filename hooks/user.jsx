import axios from "axios"
import { toast } from "react-toastify"
import { baseUrl, config } from "./baseUrl"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haXJhanJpbmQ0QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWQiOiI2NDAwN2Q1ZTZiMWEyY2UyMjBjYTRiYmQiLCJpYXQiOjE2NzgyNTUyOTF9.eABKWEmM2_p8g0f4DPhE2wqtA5ruChu-JG-35nGuF5M'

export const doSignUp = async (data, router) => {
    try {
        const res = await axios.post(`${baseUrl}/auth/register`, data)
        if (res) {
            toast.success('User Created successfully')
        }
        router.push("/login")
        return res
    } catch (error) {
        toast.error(error.response.data.error)
        console.log({ error })
    }
}

export const doSignUpWithGoogle = async (data, router) => {
    try {
        const res = await axios.post(`${baseUrl}/auth/register`, data)
        console.log('register', res)
        if (res) {
            window.location.assign("/")
            localStorage.setItem('user', JSON.stringify(res.data.data.user))
            localStorage.setItem('token', res.data.data.token)
        }
        return res
    } catch (error) {
        if (error.response.data.error == "Email already exists") {
            const res = await axios.post(`${baseUrl}/auth/login`, { email: data.email })
            console.log('login', res)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.data.user))
            window.location.assign("/")

        }
    }
}

export const doSignIn = async (data, setLoading) => {
    setLoading(true)
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, data)
        window.location.assign("/")
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data.user))
        toast.success('Logged in Success')
        setLoading(false)
        return res
    } catch (error) {
        setLoading(false)
        toast.error(error.response.data.error)
        console.log({ error })
    }
}

export const doLogOut = async (router) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
}

export const doForgotPassword = async (data, setSuccess, router, setLoading) => {
    try {
        setLoading(true)
        const res = await axios.post(`${baseUrl}/auth/forgotPassword`, data)
        console.log('res', res)
        toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        setLoading(false)
        setSuccess(true)
        return res
    } catch (error) {
        setLoading(false)
        console.log({ error })
        toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}

export const doResetPassword = async (data, router) => {
    console.log('token', data)
    try {
        const res = await axios.post(`${baseUrl}/auth/resetPassword`, data)
        console.log(res)
        toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        router.push('/login')
        return res
    } catch (error) {
        console.log({ error })
        toast.error(error.response.data.err, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}
export const updateProfile = async (data, id, setLoading) => {
    setLoading(true)
    try {
        const res = await axios.patch(`${baseUrl}/user/update-user/${id}`, data, config)
        console.log('ipdate', res.data.userTemp)
        localStorage.setItem('user', JSON.stringify(res.data.userTemp))
        setLoading(false)
        toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        setLoading(false)
        console.log({ error })
        toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}
export const updatePassword = async (data, id, setLoading) => {
    setLoading(true)
    try {
        const res = await axios.patch(`${baseUrl}/user/update-user/${id}`, data, config)
        console.log('ipdate', res.data.userTemp)
        setLoading(false)
        toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        setLoading(false)

        console.log({ error })
        toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}
export const getUsers = async () => {
    try {
        const res = await axios.get(`${baseUrl}/user/get-users`, config)
        let check = res.data.filter((i) => i.role == "USER")
        return check
    } catch (error) {
        toast.error(error.response.data.err, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}
// export const getAllUsers = async () => {
//     try {
//         const res = await axios.get(`${baseUrl}/user/get-users`, config)
//         return res.data
//     } catch (error) {
//         toast.error(error.response.data.err, {
//             position: toast.POSITION.TOP_RIGHT,
//         })
//     }
// }
export const getNews = async () => {
    try {
        const res = await axios.get(`${baseUrl}/news/get-news`, config)
        // let check = res.data.filter((i) => i.role == "USER")
        console.log('news', res.data)
        // console.log('user', check)
        return res.data
    } catch (error) {
        toast.error(error.response.data.err, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}

export const getAdmin = async () => {
    try {
        const res = await axios.get(`${baseUrl}/user/get-users`, config)
        let admin = res.data.filter((i) => i.role == "ADMIN")
        let subadmin = res.data.filter((i) => i.role == "SUBADMIN")
        let data = [...admin, ...subadmin]
        return data
    } catch (error) {
        toast.error(error.response.data.err, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}
export const deleteUserMethod = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/user/delete-user/${id}`, config)
        toast.success('User Deleted', {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        console.log({ error })
    }
}
export const deleteAdminMethod = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/user/delete-user/${id}`, config)
        toast.success('Admin Deleted', {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        console.log({ error })
    }
}

export const deleteNewsMethod = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/news/delete-news/${id}`, config)
        toast.success('News Deleted', {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        console.log({ error })
    }
}

export const deleteEventMethod = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/events/delete-event/${id}`, config)
        toast.success('Event Deleted', {
            position: toast.POSITION.TOP_RIGHT,
        })
        return res
    } catch (error) {
        console.log({ error })
    }
}
