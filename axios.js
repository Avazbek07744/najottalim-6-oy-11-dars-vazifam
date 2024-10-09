import axios from "axios"


const Jsonapi = axios.create({
    baseURL: "https://json-api.uz/api/project/11-dars"
})
Jsonapi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorizzation = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)




export default Jsonapi;