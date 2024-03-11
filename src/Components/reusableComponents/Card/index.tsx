import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleDealerState } from "../../../Redux/Reducer";
import { en } from "../../../translate/en";

import { CardProps } from "./types";

const CardComponent: React.FC<CardProps> = ({
    iconBackgroundColor,
    cardTitle,
    cardBody,
    cardAction,
    width,
    cardTitleStyle,
    cardBodyStyle,
    cardActionStyle,
    cardIcon,
    path,
    screenId
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state);
    const [pointer, setPointer] = React.useState(false);

    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === screenId)?.[0];
    const handleNavigate = () => {
        // Check if screen is not available or IsView is false or null
        if (!screen || screen.IsView === false || screen.IsView === null) {
            setPointer(true);
            navigate("/dashboard");
            toast.error(en.dashboard);
            return;
        }

        navigate(path);

        const dealerState =
            cardTitle === "TOTAL USERS"
                ? "users"
                : cardTitle === "TOTAL DEALERS"
                ? user.RoleId === 1 || user.RoleId === 2
                    ? "existingDealer"
                    : "dealers"
                : cardTitle === "TOTAL DEALERS SIGNUPS"
                ? "signups"
                : "";
        dispatch(handleDealerState(dealerState));
    };
    React.useEffect(() => {
        if (!screen) {
            setPointer(true);
        } else {
            setPointer(false);
        }
    }, [screen]);

    return (
        <Card sx={{ minWidth: width ?? 220, borderRadius: 0, boxShadow: 0 }}>
            <CardContent>
                <Typography sx={cardTitleStyle ?? { fontSize: 14, color: "#848484" }} fontWeight={500} gutterBottom>
                    {cardTitle}
                </Typography>
                <Typography variant="h4" fontWeight={900} component="div" sx={cardBodyStyle || { color: "#393939" }}>
                    {cardBody}
                </Typography>

                <Box
                    display="flex"
                    sx={{ cursor: pointer ? "not-allowed" : "pointer", color: pointer ? "#eee" : "#000" }}
                    justifyContent="space-between"
                    alignItems="flex-end"
                >
                    <Box>
                        <CardActions
                            sx={
                                cardActionStyle || {
                                    textDecoration: "underline",
                                    fontWeight: 600,
                                    marginLeft: "-3px",
                                    color: pointer ? "#c1cad9" : "#393939"
                                }
                            }
                            onClick={handleNavigate}
                        >
                            {cardAction}
                        </CardActions>
                    </Box>
                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "50px",
                            aspectRatio: 1,
                            backgroundColor: iconBackgroundColor
                        }}
                    >
                        <Box>{cardIcon}</Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardComponent;
