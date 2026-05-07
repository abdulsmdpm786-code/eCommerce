import axios from "axios"

const Axios_Api = axios.create(
    {
        baseURL: "https://ecommerce-backend-xcfh.onrender.com"
    }
)

export default Axios_Api