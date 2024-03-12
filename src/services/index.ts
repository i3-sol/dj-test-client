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
        return await axios.post(`${base_url}/${url}/`, data)
    } catch (error: any) {
        return error.response
    }
}

export const putRequest = async (url: string, id: number, data: any) => {
    try {
        return await axios.put(`${base_url}/${url}/${id}/`, data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteRequest = async (url: string, id: number) => {
    try {
        const res = await axios.delete(`${base_url}/${url}/${id}/`)

        return res.data

    } catch (error) {
        console.log(error)
    }
}