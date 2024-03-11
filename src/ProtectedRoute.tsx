import React from "react";
import { Navigate } from "react-router-dom";

import RoutesEnum from "./Enums/Routes.enum";
import { useAppSelector } from "./Redux/hooks";

const ProtectedRoute = ({ children }: any) => {
    const { user } = useAppSelector((state) => state);
    if (!user?.UserID) {
        return <Navigate to={RoutesEnum.home} />;
    }
    return children;
};
export default ProtectedRoute;
