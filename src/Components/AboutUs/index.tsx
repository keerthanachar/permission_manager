/* eslint-disable no-unsafe-optional-chaining */
import React from "react";

import { Box, Grid, Paper, Typography } from "@mui/material";

import { en } from "../../translate/en";

const AboutUs = () => {
    return (
        <Box component="div" width="100%" display="flex" mt={10} sx={{ backgroundColor: "" }}>
            <Grid container>
                <Grid item lg={8} md={8} sm={12} xs={12} p={2}>
                    <Paper elevation={5} sx={{ width: "100%" }}>
                        <Grid item lg={12} container>
                            <Grid item lg={12} sx={{ borderRadius: 2, width: "100%", backgroundColor: "#f5f5f5" }}>
                                <Box>
                                    <Typography p={2} variant="body1" fontWeight={300}>
                                        {en.aboutUs}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item lg={12} gap={2}>
                                <Box>
                                    <Typography px={2} variant="h6" fontWeight={700}>
                                        ABOUT US
                                    </Typography>
                                    <Box width="100%" display="flex" justifyContent="center" gap={2} p={2}>
                                        <Typography variant="body2" px={3}>
                                            Road Dealer was founded by Jim Battista in January of 2010 and was developed through his personal
                                            experience in purchasing inventory for nine years for his own and other dealerships. Necessity became the
                                            mother of invention as the high cost of auction fees and transportation fees motivated Jim to find a more
                                            efficient solution. That solution was creating his own network of like-minded dealers who made their
                                            inventory available to each other and committed to each other to operate above board in creating the
                                            relationship. Jim realized he needed to help other dealers create these relationships as well, so Road
                                            Dealer as an online and mobile resource was born. Road Dealer is a dealer community, whose relationships
                                            are facilitated via a patent pending App and Website. Dealers can easily buy and sell unlimited vehicles
                                            and also get buy bids from members of the dealer community. The most important aspect of everything is the
                                            ease with which you can put a deal together. We are in the car business after all and we do our best work
                                            having conversations and building lasting relationships.
                                        </Typography>
                                    </Box>
                                    <Typography p={2} variant="h6" fontWeight={700}>
                                        OUR MISSION
                                    </Typography>
                                    <Box width="100%" display="flex" justifyContent="center" gap={2} p={2}>
                                        <Typography variant="body2" px={3}>
                                            Road Dealer was founded by Jim Battista in January of 2010 and was developed through his personal
                                            experience in purchasing inventory for nine years for his own and other dealerships. Necessity became the
                                            mother of invention as the high cost of auction fees and transportation fees motivated Jim to find a more
                                            efficient solution. That solution was creating his own network of like-minded dealers who made their
                                            inventory available to each other and committed to each other to operate above board in creating the
                                            relationship. Jim realized he needed to help other dealers create these relationships as well, so Road
                                            Dealer as an online and mobile resource was born. Road Dealer is a dealer community, whose relationships
                                            are facilitated via a patent pending App and Website. Dealers can easily buy and sell unlimited vehicles
                                            and also get buy bids from members of the dealer community. The most important aspect of everything is the
                                            ease with which you can put a deal together. We are in the car business after all and we do our best work
                                            having conversations and building lasting relationships.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} p={2}>
                    <Paper elevation={5} sx={{ width: "100%" }}>
                        <Grid item lg={12} container>
                            <Grid item lg={12} sx={{ borderRadius: 2, width: "100%", backgroundColor: "#f5f5f5" }}>
                                <Typography p={2} variant="body1" fontWeight={300}>
                                    Contact Us
                                </Typography>
                            </Grid>
                            <Grid item gap={2} p={1}>
                                <Typography variant="body2" px={2}>
                                    Have questions or need help? Our friendly staff is available to answer any questions you may have.
                                </Typography>
                                <Typography variant="body2" px={2}>
                                    P: 708-692-2280 (US)
                                </Typography>
                                <Typography variant="body1" fontWeight={700} px={2}>
                                    Hours:
                                </Typography>
                                <Typography variant="body2" px={2}>
                                    Monday - Sunday
                                </Typography>
                                <Typography variant="body2" px={2}>
                                    12:00 AM - 11:30 PM
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
export default AboutUs;
