import { IoChatbubblesSharp } from "react-icons/io5";

import EmojiTransportationOutlinedIcon from "@mui/icons-material/EmojiTransportationOutlined";
import { Typography } from "@mui/material";

import { ReactComponent as Carplus } from "../../Assets/carplus.svg";
import { ReactComponent as DealersIcon } from "../../Assets/map-car-dealer.svg";
import GrGarageIcon from "../../Components/reusableComponents/Icons/GrGarage";
import GrStorage from "../../Components/reusableComponents/Icons/GrStorage";

export const CardSection1 = [
    {
        cardTitle: "Modern Technology",
        cardBody: ` Road Dealer stands as a unique
        technological platform, with its
        cornerstone being a dynamic, real-time
        vehicle database meticulously crafted
        with dealer Input at the forefront. Our
        approach to vehicle acquisition is a 
        complete reimagining of the decades 
        old wholesale process.`
    },
    {
        cardTitle: "Cost Savings",
        cardBody: `Rather than accumulating and increase
         your knowledge base through Community auction 
         fees, Road Dealer offers a
        simplified approach - a single,
        affordable monthly fee. Now is the
        opportune moment to enhance the
        profitability of your dealership
        operations.`
    },
    {
        cardTitle: "True Convenience",
        cardBody: `Explore an extensive inventory of
        vehicles 24/7, with Road Dealer. It
        stands as the ultimate convenience for
        dealers engaged in sourcing and liquidating vehicles.
        Our platform not only drastically reduces costs, 
        but also significantly reduces the time investment 
        required in the process.`
    }
];
export const CardSection2 = [
    {
        cardTitle: "Card 1",
        cardBody: "Card Body",
        cardAction: "Card Action"
    },
    {
        cardTitle: "Card 2",
        cardBody: "Card Body",
        cardAction: "Card Action"
    },
    {
        cardTitle: "Card 3",
        cardBody: "Card Body",
        cardAction: "Card Action"
    }
];
export const DealCards = [
    {
        cardTitle: "TOTAL DEALERS",
        cardBody: "toatalDealers",
        cardAction: "View Dealers",
        cardIcon: <DealersIcon fill="#51B09D" />,
        iconBackgroundColor: "#DFF3F0",
        path: "/dealers"
    },
    {
        cardTitle: "TOTAL DEALERS SIGNUPS",
        cardBody: "toatalDealersSignups",
        cardAction: "View Signups",
        cardIcon: <Carplus fill="#4F9AD6" style={{ width: "25px", height: "30px" }} />,
        iconBackgroundColor: "#E1EFF9",
        path: "/dealers"
    },
    {
        cardTitle: "ACTIVE LISTINGS",
        cardBody: "1000",
        cardAction: "View Listings",
        cardIcon: <DealersIcon fill="#EDBC63" />,
        iconBackgroundColor: "#FDF4E6",
        path: "/dashboard"
    },
    {
        cardTitle: "OPEN BIDS",
        cardBody: "2000",
        cardAction: "View Bids",
        cardIcon: <DealersIcon fill="#505E8E" />,
        iconBackgroundColor: "#E1E5EC",
        path: "/bids"
    },
    { cardIcon: <GrStorage iconsColor="#51B09D" /> },
    { cardIcon: <GrStorage iconsColor="#4F9AD6" /> },
    { cardIcon: <GrStorage iconsColor="#EDBC63" /> },
    { cardIcon: <GrGarageIcon iconsColor="#505E8E" /> },
    { cardIcon: <IoChatbubblesSharp fill="#51B09D" style={{ width: "25px", height: "30px" }} /> },
    { cardIcon: <EmojiTransportationOutlinedIcon style={{ color: "#4F9AD6", width: "25px", height: "30px" }} /> }
];

export const CarLogo = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png",
    "https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png",
    "https://pngimg.com/d/car_logo_PNG1654.png",
    "https://purepng.com/public/uploads/large/purepng.com-toyota-car-logologocar-brand-logoscarstoyota-car-logo-1701527428948tj6m0.png",
    "https://purepng.com/public/uploads/large/purepng.com-opel-car-logologocar-brand-logoscarsopel-car-logo-1701527428787shjzj.png",
    "https://purepng.com/public/uploads/thumbnail/purepng.com-car-logologocar-brand-logoscars-1701527429081pccft.png",
    "https://freepngimg.com/thumb/car%20logo/9-jeep-car-logo-png-brand-image.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png",
    "https://www.carlogos.org/car-logos/nissan-logo-2001-2000x1750.png",
    "https://clipart-library.com/img1/1408999.png",
    "https://freepngimg.com/thumb/car%20logo/6-mini-car-logo-png-brand-image-thumb.png",
    "https://i.pinimg.com/originals/eb/c8/79/ebc879b865b7ebafcabc962df2fec051.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rolls-Royce_Motor_Cars_logo.svg/1638px-Rolls-Royce_Motor_Cars_logo.svg.png",
    "https://zeevector.com/wp-content/uploads/Skoda-Logo-PNG-Download.png",
    "https://pngimg.com/d/car_logo_PNG1667.png",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcrcV2DCt1IA79eIOpVoRUJT_3mbgz3I1caT_YPk00oK7jWVIEpjkdg_TKmGA5SVn0bzviCm4UzIGWCrUGMdJIVfPrbuSgThRKsySFgXEwmV6rfakoBQwIgzDX2o_Wk_ESqvjsgoY-gd5XA_80hiz74MvLSGTCpEbI_GA89Vo2Bd9vIIowbY9a_UVj/w320-h313/volvo-logo-png-transparent.png"
];

export const steps = [
    {
        title: (
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Dealer <br /> Signup{" "}
            </Typography>
        ),
        content: (
            <Typography>
                Lorem ipsum <br /> dolor sit amet
            </Typography>
        )
    },
    {
        title: (
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Inventory <br /> Management
            </Typography>
        ),
        content: (
            <Typography>
                Lorem ipsum <br /> dolor sit amet
            </Typography>
        )
    },
    {
        title: (
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Bid <br /> Management
            </Typography>
        ),
        content: (
            <Typography>
                Lorem ipsum <br /> dolor sit amet
            </Typography>
        )
    },
    {
        title: (
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Buyer Seller <br /> Chat
            </Typography>
        ),
        content: (
            <Typography>
                Lorem ipsum <br /> dolor sit amet
            </Typography>
        )
    },
    {
        title: (
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Bid <br /> Finalisation{" "}
            </Typography>
        ),
        content: (
            <Typography>
                Lorem ipsum <br /> dolor sit amet
            </Typography>
        )
    }
];

export const testimonials = [
    {
        detail: {
            name: "John Doe",
            position: "Director",
            company: "Pugi VW Hyundai Mazda"
        },
        photo: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        video: "https://www.youtube.com/watch?v=CDOPrAw3C0k"
    },
    {
        detail: {
            name: "John Doe",
            position: "Director",
            company: "Pugi VW Hyundai Mazda"
        },
        photo: "https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
        video: "https://www.youtube.com/watch?v=CDOPrAw3C0k"
    },
    {
        detail: {
            name: "John Doe",
            position: "Director",
            company: "Pugi VW Hyundai Mazda"
        },
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoKJPxxwPeNvISnBbZsZHe887Ws0FnrL7o0w&usqp=CAU",
        video: "https://www.youtube.com/watch?v=CDOPrAw3C0k"
    }
];

export const partners = [
    "https://logodix.com/logo/912523.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chicago_Tribune_Logo.svg/302px-Chicago_Tribune_Logo.svg.png",
    "https://logodix.com/logo/912523.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chicago_Tribune_Logo.svg/302px-Chicago_Tribune_Logo.svg.png",
    "https://logodix.com/logo/912523.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chicago_Tribune_Logo.svg/302px-Chicago_Tribune_Logo.svg.png",
    "https://logodix.com/logo/912523.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chicago_Tribune_Logo.svg/302px-Chicago_Tribune_Logo.svg.png"
];
