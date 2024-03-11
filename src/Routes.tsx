import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

import HoC from "./Components/reusableComponents";
// eslint-disable-next-line import/no-named-as-default
import RoutesEnum from "./Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { handleBreakPoints } from "./Redux/Reducer";
import LazyLoad from "./LazyLoad";
import ProtectedRoute from "./ProtectedRoute";

const RoutesPage = ({ projectDetails }: any) => {
    const { user } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const muiTheme = useTheme();
    const xs = useMediaQuery(muiTheme.breakpoints.up("xs"));
    const sm = useMediaQuery(muiTheme.breakpoints.up("sm"));
    const md = useMediaQuery(muiTheme.breakpoints.up("md"));
    const lg = useMediaQuery(muiTheme.breakpoints.up("lg"));
    const xl = useMediaQuery(muiTheme.breakpoints.up("xl"));
    React.useEffect(() => {
        dispatch(handleBreakPoints({ xs, sm, md, lg, xl }));
    }, [xs, sm, md, lg, xl]);
    return (
        <Box component="div">
            <Suspense fallback={<HoC.Spinner open />}>
                <Routes>
                    <Route path={RoutesEnum.home} element={<LazyLoad.Home projectDetails={projectDetails} />} />
                    <Route path={RoutesEnum.contactUs} element={<LazyLoad.ContactUs />} />
                    <Route path={RoutesEnum.aboutUs} element={<LazyLoad.AboutUs />} />
                    <Route
                        path={RoutesEnum.dashboard}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    {user?.RoleId === 1 && (
                        <Route
                            path={RoutesEnum.roleManagement}
                            element={
                                <ProtectedRoute>
                                    <LazyLoad.RoleManagement />
                                </ProtectedRoute>
                            }
                        />
                    )}
                    <Route
                        path={RoutesEnum.administrators}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.Administrators />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.bids}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.Bids />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.bidsDetails}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.BidsDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.dealers}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.Dealers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.createDealers}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.CreateDealers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.createUser}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.CreateUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.inventory}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.Inventory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.addInventory}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.AddInventory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.product}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.Product />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.productDetails}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.ProductDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.myBids}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.MyBids />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.dealerAdmin}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.DealerAdmin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.viewDealerAdmin}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.ViewDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.myGarage}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.MyGarage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.reachOut}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.ReachOut />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.reachOutRequests}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.ReachOutRequests />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.buyFigure}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.BuyFigure />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.addBuyFigure}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.AddBuyFigure />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.buyFigureDetails}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.BuyFigureDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.privateNetworks}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.PrivateNetworks />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RoutesEnum.addprivateNetworks}
                        element={
                            <ProtectedRoute>
                                <LazyLoad.AddPrivateNetwork />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={RoutesEnum.testing} element={<LazyLoad.Testing />} />
                    {/* <Route path={RoutesEnum.dealers} element={<Dealer />} /> */}
                </Routes>
            </Suspense>
        </Box>
    );
};

export default RoutesPage;
