import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "../components/Homepage";

const Counter = () => {
    const token = useSelector((state) => state.tokenSlice.token);
    const admin = useSelector((state) => state.adminSlice.admin);

    return <>{!token ? <Navigate to="/login" /> : admin ? <Homepage /> : <Homepage />}</>;
};

export default Counter;
