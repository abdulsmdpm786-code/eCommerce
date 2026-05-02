import { Navigate, replace } from "react-router-dom";

const Protect = ({children})=>{
    const token = localStorage.getItem("token")

    if (!token){
        return <Navigate to={"/signup"} replace: true />
    }
    return children
}

export default Protect