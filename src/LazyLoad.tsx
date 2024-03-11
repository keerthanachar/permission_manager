import { lazy } from "react";

const Home = lazy(() => import("./Screens/HomePage/Home"));
const AboutUs = lazy(() => import("./Components/AboutUs"));
const ContactUs = lazy(() => import("./Components/Forms/ContactUs"));
const Dashboard = lazy(() => import("./Screens/Dashboard"));
const RoleManagement = lazy(() => import("./Screens/RoleManagement"));
const Administrators = lazy(() => import("./Screens/Administator"));
const Dealers = lazy(() => import("./Screens/Dealer"));
const CreateDealers = lazy(() => import("./Screens/Dealer/CreateDealer/CreateDealers"));
const Testing = lazy(() => import("./Testing"));
const CreateUser = lazy(() => import("./Screens/Dealer/ExistingDealers/CreateUsers/CreateUser"));
const Inventory = lazy(() => import("./Screens/Inventory/index"));
const Product = lazy(() => import("./Screens/Product/index"));
const ProductDetails = lazy(() => import("./Screens/Product/ProductDetails/index"));
const AddInventory = lazy(() => import("./Screens/Inventory/AddInventory/AddInventory"));
const BidsDetails = lazy(() => import("./Screens/BidsManagementCardDetails/index"));
const Bids = lazy(() => import("./Screens/Bids/index"));
const PageUnderDevelopment = lazy(() => import("./Screens/PageUnderDevelopment"));
const MyBids = lazy(() => import("./Screens/MyBids"));
const DealerAdmin = lazy(() => import("./Screens/Dealer/DealerAdmin"));
const ViewDetails = lazy(() => import("./Screens/Dealer/DealerAdmin/viewDetails"));
const ReachOutRequests = lazy(() => import("./Screens/ReachOut/ReachOutsComponent"));
const ReachOut = lazy(() => import("./Screens/ReachOut/ReachOut"));
const MyGarage = lazy(() => import("./Screens/MyGarage/Garage"));
const BuyFigure = lazy(() => import("./Screens/BuyFigure/index"));
const AddBuyFigure = lazy(() => import("./Screens/BuyFigure/AddBuyFigure/AddBuyFigure"));
const BuyFigureDetails = lazy(() => import("./Screens/BuyFigure/BuyFigureDetail/BuyFigureDetail"));
const PrivateNetworks = lazy(() => import("./Screens/PrivateNetwork"));
const AddPrivateNetwork = lazy(() => import("./Screens/PrivateNetwork/AddPrivateNetwork"));

export default {
    Home,
    AboutUs,
    ContactUs,
    Dashboard,
    RoleManagement,
    Administrators,
    Dealers,
    PageUnderDevelopment,
    CreateDealers,
    Testing,
    CreateUser,
    Inventory,
    Product,
    ProductDetails,
    BidsDetails,
    Bids,
    AddInventory,
    MyBids,
    DealerAdmin,
    ViewDetails,
    ReachOut,
    ReachOutRequests,
    MyGarage,
    BuyFigure,
    AddBuyFigure,
    BuyFigureDetails,
    PrivateNetworks,
    AddPrivateNetwork
};
