import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Grid, Link, Typography } from "@mui/material";

import AboutCompany from "../../Assets/AboutCompany.png";
import HomePage from "../../Assets/Homepagephoto.jpg";
// import Cars from "../../Assets/Cars-img.png";
// import MobileViewCars from "../../Assets/Mobile-View-Car.png";
import play from "../../Assets/play-button-arrowhead.png";
import Footer from "../../Components/reusableComponents/Footer";
import HomeCard from "../../Components/reusableComponents/HomeCard";
import TestimonialCard from "../../Components/reusableComponents/Testimonial";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleHomePageNavigation } from "../../Redux/Reducer";
import { en } from "../../translate/en";

import { homeProps } from "./types";
import { CardSection1, CarLogo, partners, testimonials } from "./Uitilities";

const Home: React.FC<homeProps> = () => {
    const { HomePageNavigation } = useAppSelector((state) => state);
    const [carLogos, setCarLogos] = useState(CarLogo || []);
    const dispatch = useAppDispatch();

    const home = useRef<HTMLDivElement>(null);
    const aboutUs = useRef<HTMLDivElement>(null);
    const feedback = useRef<HTMLDivElement>(null);
    const howItWorks = useRef<HTMLDivElement>(null);
    const partner = useRef<HTMLDivElement>(null);
    const contactUs = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rotateLogos = () => {
            const newArray = [...carLogos];
            const firstLogo: any = newArray.shift();
            newArray.push(firstLogo);
            setCarLogos(newArray);
        };

        const timeoutId = setTimeout(rotateLogos, 2500);

        return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
    }, [carLogos]);

    useEffect(() => {
        if (HomePageNavigation === en.home) {
            home?.current?.scrollIntoView();
        } else if (HomePageNavigation === en.aboutUs) {
            aboutUs?.current?.scrollIntoView();
        } else if (HomePageNavigation === en.feedback) {
            feedback?.current?.scrollIntoView();
        } else if (HomePageNavigation === en.howItWorks) {
            howItWorks?.current?.scrollIntoView();
        } else if (HomePageNavigation === en.partners) {
            partner?.current?.scrollIntoView();
        } else if (HomePageNavigation === en.contactUs) {
            contactUs?.current?.scrollIntoView();
        }
    }, [HomePageNavigation]);

    return (
        <Box component="div" sx={{ backgroundColor: "#fff" }}>
            <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12} ref={home}>
                    <Box sx={{ position: "relative", width: "100%", height: "95vh", overflow: "hidden" }}>
                        <Box sx={{ position: "relative", width: "100%", height: "95vh", overflow: "hidden" }}>
                            <img
                                src={HomePage}
                                alt="Home Page"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: "25%",
                                    left: "45px",
                                    color: "#fff",
                                    zIndex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px"
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "25px", color: "#fff" }}>
                                    Created by...
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "25px", color: "#fff" }}>
                                    Built By...
                                </Typography>
                                <Box
                                    sx={{
                                        position: "relative",
                                        backgroundColor: "#3c1b7879",
                                        width: "fit-content",
                                        height: "34px",
                                        display: "flex",
                                        alignItems: "flex-end",
                                        left: "-15px"
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 800, fontSize: "25px", color: "#fff", px: 2 }}>POWERED BY CAR DEALERS</Typography>
                                </Box>
                                <Box padding="3px 6px">
                                    <Button
                                        variant="filled"
                                        onClick={() => dispatch(handleHomePageNavigation("Contact Us"))}
                                        sx={{
                                            backgroundColor: "#5318A3",
                                            color: "#fff",
                                            fontSize: "small",

                                            minWidth: "unset",
                                            "&:hover": { backgroundColor: "#5318A3" }
                                        }}
                                    >
                                        Join The Community
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: "20px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                color: "#fff",
                                zIndex: 1,
                                width: "90%", // Adjusted width
                                overflowX: "auto" // Added overflow handling for horizontal scrolling
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                                {carLogos.map((item: any, index: any) =>
                                    index < 9 ? (
                                        <Box
                                            key={index}
                                            sx={{
                                                backgroundColor: "#fff",
                                                padding: 1,
                                                borderRadius: 3,
                                                px: 3,
                                                display: "flex",
                                                width: "100px",
                                                justifyContent: "center",
                                                height: "60px",
                                                transition: "transform 2s ease-in-out"
                                            }}
                                        >
                                            <img src={item} width="40px" height="40px" alt="car logo" />
                                        </Box>
                                    ) : null
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid
                    item
                    spacing={0}
                    sx={{
                        width: "100%",
                        px: 2,
                        py: 5,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "center",
                        gap: 3
                    }}
                >
                    {CardSection1?.map((card: any, i: number) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3.5}>
                            <HomeCard cardTitle={card.cardTitle} cardBody={card.cardBody} />
                        </Grid>
                    ))}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} ref={aboutUs}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-start" } }}>
                        <Box sx={{ width: { xs: "90%", md: "50%" }, pl: { xs: 2, md: 18 }, pb: { xs: 4, md: 10 }, pt: 2 }}>
                            <Typography sx={{ color: "#5D26A9", fontWeight: 800 }}>ABOUT THE COMPANY</Typography>

                            <Typography variant="body2" py={2} sx={{ width: "85%" }}>
                                Road Dealer is a real-time database for automotive dealers, facilitating swift and efficient transactions in the
                                buying and selling of used vehicle inventory. The platform operates online or on your phone offering exclusive access
                                to our community and helping dealers save money by eliminating transaction fees.
                            </Typography>
                            <Box sx={{ display: "flex", gap: 5 }}>
                                <Box width="80%" py={1}>
                                    <Typography sx={{ color: "#5318A3", fontWeight: "bold", fontSize: "30px" }}>10+</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>YEARS</Typography>
                                </Box>
                                <Box width="80%" py={1}>
                                    <Typography sx={{ color: "#5318A3", fontWeight: "bold", fontSize: "30px" }}>1500+</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Users</Typography>
                                </Box>
                                <Box width="80%" py={1}>
                                    <Typography sx={{ color: "#5318A3", fontWeight: "bold", fontSize: "30px" }}>75,000+</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Inventory</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{ width: { xs: "100%", md: "50%" }, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <div
                                style={{
                                    width: "90%",
                                    height: "90%",
                                    maxWidth: "700px",
                                    maxHeight: "500px",
                                    border: "1px solid #ccc",
                                    overflow: "hidden"
                                }}
                            >
                                <img src={AboutCompany} alt="Company" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            </div>
                        </Box>
                    </Box>
                </Grid>

                <Grid item container spacing={0} py={3} sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ color: "#5D26A9", fontWeight: 800 }}>ABOUT OUR FOUNDER</Typography>
                    <Typography sx={{ px: { xs: 2, md: 18 }, textAlign: { xs: "start", md: "center" }, py: 3 }}>
                        Established in January of 2010 by Jim Battista and his automotive mentors, RoadDealer.com Evolved from his 16 years of hands
                        on experience. Functioning as a network of Like Minded dealers, Road Dealer enables members to share their inventory while
                        fostering a commitment to transparent and ethical business practices. Recognizing the importance of assisting fellow car
                        people in cultivating such relationships, Jim conceptualized and brought to life Road Dealer as an online and mobile resource.
                    </Typography>
                    <Box>
                        <Box
                            sx={{
                                backgroundImage:
                                    "url(https://www.avalara.com/content/dam/assets/photography/india-migration/blog-man-wearing-suit-hero.avacustomrendition.1199.0.jpg)",
                                width: "85vw",
                                height: "50vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <a
                                style={{ height: "25px" }}
                                href="https://www.youtube.com/watch?v=NKLqwds8FzI&list=PLNpo91T1cGKsIgse-LOsNyxj4I6djLrIr"
                                target="blank"
                            >
                                <img width="100px" height="100px" src={play} alt="Play" style={{ filter: "drop-shadow(7px -7px 0px #A462FF)" }} />
                            </a>
                        </Box>
                    </Box>
                </Grid>

                {/* <Grid container spacing={0} py={8} ref={howItWorks} sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Typography sx={{ color: "#5D26A9", display: "flex", justifyContent: "center", fontWeight: 800 }}>
                        {" "}
                        HOW IT WORKS IN PRACTICE
                    </Typography>
                    <Typography sx={{ px: { xs: 2, md: 30 }, textAlign: { xs: "start", md: "center" }, py: 3 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor incididunt ut labore et dolore magna aliqua
                    </Typography>
                    {!breakPoints?.sm ? (
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            {steps.map((item, index) => (
                                <Box key={index} sx={{ textAlign: "center", my: 4 }}>
                                    <Box sx={{ borderTop: "3px solid #EBDDFF", width: "40%", mx: "auto" }} />
                                    <Box
                                        sx={{
                                            backgroundColor: "#EBDDFF",
                                            borderRadius: "50%",
                                            padding: 2,
                                            width: "50px",
                                            height: "50px",
                                            color: "#A462FF",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontWeight: "bold",
                                            fontSize: "20px",
                                            mx: "auto",
                                            my: 2
                                        }}
                                    >
                                        0{index + 1}
                                    </Box>
                                    <Box sx={{ borderTop: "3px solid #EBDDFF", width: "40%", mx: "auto" }} />
                                    <Box sx={{ textAlign: "center", mt: 2 }}>
                                        {item.title}
                                        {item.content}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {steps.map((item, index) => (
                                <Box key={index} sx={{ textAlign: "center" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Box sx={{ borderTop: "3px solid #EBDDFF", position: "relative", top: "24px", width: "8vw" }} />
                                        <Box
                                            sx={{
                                                backgroundColor: "#EBDDFF",
                                                borderRadius: "50%",
                                                padding: 2,
                                                width: "50px",
                                                height: "50px",
                                                color: "#A462FF",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontWeight: "bold",
                                                fontSize: "20px"
                                            }}
                                        >
                                            0{index + 1}
                                        </Box>

                                        <Box sx={{ borderTop: "3px solid #EBDDFF", position: "relative", top: "24px", width: "8vw" }} />
                                    </Box>
                                    <Box sx={{ position: "relative", left: "0%", textAlign: "center" }}>
                                        {item.title}
                                        {item.content}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Grid> */}
                <Grid item container spacing={0} py={4} ref={feedback} sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ color: "#5D26A9", fontWeight: 800 }}>COMMUNITY MEMBER TESTIMONIALS</Typography>
                    <Box display="flex" gap={1}>
                        <Typography sx={{ px: { xs: 2, md: 30 }, textAlign: { xs: "start", md: "center" }, py: 3 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.{" "}
                            <Link href="https://www.youtube.com/@RoadDealercom" target="_blank">
                                {"  "}
                                View More...
                            </Link>
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 7, flexDirection: { xs: "column", sm: "row" } }}>
                        {testimonials.map((item) => (
                            <TestimonialCard detail={item.detail} photo={item.photo} video={item.video} />
                        ))}
                    </Box>
                </Grid>
                <Grid item container spacing={0} py={1} ref={partner} sx={{ display: "grid", justifyItems: "center" }}>
                    <Typography sx={{ color: "#5D26A9", fontWeight: 800, pb: 4 }}>OUR PARTNERS</Typography>

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" } }}>
                        {partners.map((item) => (
                            <Box sx={{ border: "1px solid #E2EEF3", padding: 4 }}>
                                <img width="200px" src={item} alt="partner" />
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item container spacing={0} pt={8} ref={contactUs} sx={{ display: "flex", justifyContent: "center" }}>
                    <Footer />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
