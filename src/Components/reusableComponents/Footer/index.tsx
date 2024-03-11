import { memo } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallIcon from "@mui/icons-material/Call";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
// import call from "../../../Assets/call.png";
// import mail from "../../../Assets/envelope.png";
// import facebook from "../../../Assets/facebook-app-symbol.png";
// import instagram from "../../../Assets/instagram.png";
// import linkedin from "../../../Assets/linkedin.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

import API from "../../../API";
// import youtube from "../../../Assets/youtube.png";
import RoutesEnum from "../../../Enums/Routes.enum";
import { useAppDispatch } from "../../../Redux/hooks";
import { handleHomePageNavigation, showAlert } from "../../../Redux/Reducer";
import { validateFormOnSubmit } from "../../../reusableFunctions/ReusableFunctions";
import { en } from "../../../translate/en";
import GenerateForm from "../GenerateForms";

import { FooterConfig } from "./utilities";

const Footer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formikProps = useFormik({
        initialValues: {
            ...FooterConfig.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a }))
        },
        onSubmit: async (values: any) => {
            try {
                const res: any = await API.AddContactUs.addContactUs(values);
                if (res?.data?.data?.status) {
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: en.getBackToYou,
                            closeIcon: true
                        })
                    );
                    formikProps.resetForm();
                    navigate(RoutesEnum.home);
                }
            } catch (error: any) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "error",
                        message: error?.response?.data?.data?.error ?? error?.response?.data.message,
                        closeIcon: true
                    })
                );
            }
        },
        validate: (values: any) => {
            return validateFormOnSubmit(values, [FooterConfig]);
        }
    });
    return (
        <Box sx={{ width: "100vw" }}>
            <Box sx={{ backgroundColor: "#302939", width: "100%", px: { xs: 2, md: 12 }, py: { xs: 2, md: 4 } }}>
                {/* ... (existing code) */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                    <Box component="form" onSubmit={formikProps.handleSubmit} sx={{ mb: { xs: 3, md: 0 } }}>
                        <Typography sx={{ color: "#EBDDFF", fontSize: "small", fontWeight: 600, py: 2 }}>SEND US A MESSAGE</Typography>
                        <Box>
                            <Typography sx={{ color: "#EBDDFF", fontSize: "35px", fontWeight: 800 }}>Schedule a demo</Typography>
                            <Typography sx={{ color: "#EBDDFF", fontSize: "small", pb: 2 }}>
                                We will respond to your message as soon as possible
                            </Typography>
                        </Box>

                        <Box>
                            <GenerateForm FormData={FooterConfig} FormikProps={formikProps} lg={5.5} xl={5.5} md={5.5} xs={12} />
                        </Box>
                        <Button
                            type="submit"
                            sx={{
                                width: "fit-content",
                                backgroundColor: "#EBDDFF",
                                color: "#302939",
                                fontSize: "medium",
                                my: 2,
                                p: 2,
                                fontWeight: 600,
                                ":hover": {
                                    color: "#EBDDFF"
                                }
                            }}
                        >
                            Join The Community
                        </Button>
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "70%" }, ml: { xs: 0, md: 2 } }}>
                        <Typography sx={{ color: "#EBDDFF", fontWeight: 600, py: 2, fontSize: "20px" }}>Road Dealer</Typography>
                        <Typography sx={{ color: "#EBDDFF", fontSize: "small", width: "80%" }}>
                            Have questions or need help? Our friendly staff is available to answer any questions you may have.
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 5, pt: 4 }}>
                            <Typography sx={{ color: "#EBDDFF", display: "flex", gap: "15px", alignItems: "center", fontSize: "small" }}>
                                {" "}
                                <Box
                                    sx={{
                                        backgroundColor: "#433C4D",
                                        padding: 2,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <CallIcon />
                                </Box>
                                708-692-2280
                            </Typography>
                            <Typography sx={{ color: "#EBDDFF", display: "flex", gap: "15px", alignItems: "center", fontSize: "small" }}>
                                {" "}
                                <Box
                                    sx={{
                                        backgroundColor: "#433C4D",
                                        padding: 2,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <EmailOutlinedIcon />
                                </Box>
                                support@roaddealer.com
                            </Typography>
                            <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        backgroundColor: "#433C4D",
                                        padding: 2,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <CalendarMonthIcon sx={{ color: "#fff" }} />
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#EBDDFF", fontSize: "small" }}>Monday - Sunday</Typography>
                                    <Typography sx={{ color: "#EBDDFF", fontSize: "small" }}>12:00 AM - 11:30 PM</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: 5 }}>
                                <Box
                                    sx={{
                                        backgroundColor: "#433C4D",
                                        padding: 2,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Link href="https://www.youtube.com/@RoadDealercom" target="_blank">
                                        <YouTubeIcon sx={{ color: "#fff" }} />
                                    </Link>
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "#433C4D",
                                        padding: 2,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Link href="https://www.instagram.com/officialroaddealer" target="_blank">
                                        <InstagramIcon sx={{ color: "#fff" }} />
                                    </Link>
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "#433C4D",
                                        padding: 2,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Link href="https://www.facebook.com/roaddealer" target="_blank">
                                        <FacebookOutlinedIcon sx={{ color: "#fff" }} />
                                    </Link>
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "#433C4D",
                                        padding: 2,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Link href="https://www.linkedin.com/company/road-dealer" target="_blank">
                                        <LinkedInIcon sx={{ color: "#fff" }} />
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box
                        sx={{
                            backgroundColor: "#B9B9BA",
                            padding: 2,
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onClick={() => dispatch(handleHomePageNavigation("Home"))}
                    >
                        <ArrowUpwardIcon sx={{ width: "37px", height: "27px" }} />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "#16121C",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 10,
                    py: 3
                }}
            >
                <Typography sx={{ color: "#DDDDDD" }}>© 2021 Road Dealer. All Rights Reserved</Typography>
                <Typography sx={{ color: "#DDDDDD" }}>
                    <Link href="https://roaddealer.com/terms" target="_blank" color="inherit" underline="hover">
                        {" "}
                        Terms of Use
                    </Link>{" "}
                    <Link href="https://roaddealer.com/privacy-policy" target="_blank" color="inherit" underline="hover">
                        | Privacy Policy
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default memo(Footer);
