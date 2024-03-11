import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const HomeCard = ({ cardTitle, cardBody }: any) => {
    return (
        <Card sx={{ width: 330, height: "100%", p: 1 }}>
            <CardContent>
                <Typography sx={{ fontSize: 17, fontWeight: 700 }} color="text.secondary" gutterBottom>
                    {cardTitle}
                </Typography>

                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                    {cardBody}
                </Typography>
            </CardContent>
        </Card>
    );
};
export default HomeCard;
