import axios from "axios"
import { toast } from "react-toastify"
import { baseUrl, configFormData } from "./baseUrl"

export const SingleImageUpload = async (image, setLoading) => {
    let data = new FormData()
    data.append('image', image)
    try {
        setLoading(true)
        let res = await axios.post(`${baseUrl}/upload-image`, data, configFormData)
        console.log(res)
        setLoading(false)
        return res?.data?.Location
    } catch (error) {
        setLoading(false)
        toast.error('Image is too large Please upload the image of size 1 MB')
        console.log({ error })
    }
}

export const MultiImageUpload = async (image, setLoading) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X3R5cGUiOiJIT1NUIiwidXNlcm5hbWUiOiJzaGFocm96MjIiLCJpZCI6IjYzM2RhN2JmOGZhMmQwMDhlMzdmMjAwYSIsImlhdCI6MTY2NjQ1NTczNn0.sapjwgtovw-a6Bakz6bP3HA3dEhajJof3Y7fVjSukV8'
        }
    }
    let data = new FormData()
    image?.map((i) => data.append('image', i))
    try {
        setLoading(true)
        let res = await axios.post(`${baseURL}upload/uploadmultipledocument`, data, config)
        console.log('images', res)
        setLoading(false)
        return res?.data?.result
    } catch (error) {
        setLoading(false)
        console.log({ error })
    }
}

export const SendContactMessage = async (data, setState) => {
    try {
        let res = await axios.post(`${baseUrl}/contact-us`, data)
        console.log('red', res)
        if (res) {
            toast.success('Email has been sent to admin')
            setState({
                email: '',
                name: '',
                message: ''
            })
        }
    } catch (error) {
        console.log({ error })
    }
}