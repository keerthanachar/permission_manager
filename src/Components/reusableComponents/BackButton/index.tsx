import { useNavigate } from "react-router-dom";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@mui/material";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ marginRight: 1 }} /> Back
        </Button>
    );
};
export default BackButton;
