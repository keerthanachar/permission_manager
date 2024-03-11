import * as React from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { AccordionType } from "./type";

const AccordionComponent: React.FC<AccordionType> = ({ children, title, Icon }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Accordion onChange={() => (open ? setOpen(false) : setOpen(true))} sx={{ boxShadow: "none" }}>
                <AccordionSummary
                    expandIcon={Icon ? <Icon /> : open ? <RemoveIcon /> : <AddIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{ color: "#333", fontWeight: 600 }}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </div>
    );
};

export default AccordionComponent;
