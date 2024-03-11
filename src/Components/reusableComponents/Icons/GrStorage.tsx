import React from "react";
import { GrStorage } from "react-icons/gr";

interface IconsProps {
    // eslint-disable-next-line react/require-default-props
    iconsColor?: any;
}
const GrStorageIcon = (props: IconsProps) => {
    const { iconsColor } = props;
    return <GrStorage style={{ color: iconsColor || "", width: "25px", height: "23px" }} />;
};

export default GrStorageIcon;
