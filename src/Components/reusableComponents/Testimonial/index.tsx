import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import play from "../../../Assets/play-button-arrowhead.png";

const TestimonialCard = ({ detail, photo, video }: any) => {
    return (
        <Card
            sx={{
                width: 290,
                height: "55vh",
                backgroundImage: `url(${photo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                display: "flex",
                alignItems: "end"
            }}
        >
            <CardContent sx={{ backgroundColor: "#0000004b", width: "100%", display: "flex", alignItems: "center" }}>
                <Box>
                    <Typography sx={{ fontSize: 17, fontWeight: 700, color: "white", lineHeight: "15px" }} color="text.secondary" gutterBottom>
                        {detail.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "#DDDDDD", lineHeight: "15px" }} color="text.secondary" gutterBottom>
                        {detail.position}
                    </Typography>

                    <Typography sx={{ fontSize: 13, color: "#DDDDDD", lineHeight: "15px" }} color="text.secondary">
                        {detail.company}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", width: "30%", justifyContent: "flex-end" }}>
                    <Box sx={{ border: "1px solid white", p: 1, display: "flex", borderRadius: "20%" }}>
                        <a href={video} target="blank" style={{ height: "25px" }}>
                            <img width="25px" height="25px" src={play} alt="Play" style={{ filter: "drop-shadow(2px -2px 0px #A462FF)" }} />
                        </a>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
export default TestimonialCard;
