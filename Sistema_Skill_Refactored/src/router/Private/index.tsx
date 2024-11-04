import { Navigate } from "react-router-dom";
import { PrivateProps } from "../../interfaces";

export default function Private({ children }: PrivateProps ) {
    const token = localStorage.getItem("userToken")

    if(!token)
        return <Navigate to= "/login" />
    return children;
};