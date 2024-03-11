import call from "../../Assets/call.png";
import mail from "../../Assets/envelope.png";
import facebook from "../../Assets/facebook-app-symbol.png";
import instagram from "../../Assets/instagram.png";
import linkedin from "../../Assets/linkedin.png";
import youtube from "../../Assets/youtube.png";
import RoutesEnum from "../../Enums/Routes.enum";
import { en } from "../../translate/en";

export const homeMenu = [
    { menuName: en.home },
    { menuName: en.aboutUs },
    { menuName: en.howItWorks },
    { menuName: en.feedback },
    { menuName: en.partners },
    { menuName: en.contactUs }
];

export const DashboardMenu = [
    { menuName: en.home, menuPath: RoutesEnum.home },
    { menuName: en.administrators, menuPath: RoutesEnum.administrators },
    { menuName: en.dealers, menuPath: RoutesEnum.dealers },
    { menuName: en.roleManagement, menuPath: RoutesEnum.roleManagement },
    { menuName: en.inventory, menuPath: RoutesEnum.inventory },
    { menuName: en.bids, menuPath: RoutesEnum.bids }
];

export const menuContact = [
    { content: "support@roaddealer.com", icon: mail, link: "google.com" },
    { content: "888-227-7253", icon: call, link: "google.com" },
    { content: "", icon: youtube, link: "https://www.youtube.com/@RoadDealercom" },
    { content: "", icon: instagram, link: "https://www.instagram.com/officialroaddealer" },
    { content: "", icon: facebook, link: "https://www.facebook.com/roaddealer" },
    { content: "", icon: linkedin, link: "https://www.linkedin.com/company/road-dealer" }
];

export const LogIn = [
    {
        title: "Log In / Sign Up"
    }
];
