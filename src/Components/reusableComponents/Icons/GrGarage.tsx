import React from "react";
import { GiHomeGarage } from "react-icons/gi";

interface IconsProps {
    // eslint-disable-next-line react/require-default-props
    iconsColor?: any;
}
const GrStorageIcon = (props: IconsProps) => {
    const { iconsColor } = props;
    return <GiHomeGarage style={{ color: iconsColor || "", width: "30px", height: "28px" }} />;
};

export default GrStorageIcon;
