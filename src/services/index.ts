import axios from "axios"
import config from "../config.json"
const base_url = config.REACT_APP_BACKEND_BASE_URL

export const getRequest = async (url: string) => {
    try {
        const res = await axios.get(`${base_url}/${url}/`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const postRequest = async (url: string, data: any) => {
    try {
        const res = await axios.post(`${base_url}/${url}/`, data)
        if (res.status === 201) {
            return res.data
        } else {
            console.log("postRequest: ", res.statusText)
        }
    } catch (error) {
        console.log(error)
    }
}

export const putRequest = async (url: string, id: number, data: any) => {
    try {
        const res = await axios.post(`${base_url}/${url}/${id}`, data)

        return res.data

    } catch (error) {
        console.log(error)
    }
}