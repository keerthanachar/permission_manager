export const config: {
    dateFormat: string;
    dateTimeFormat: string;
    list: Array<{ label: string; value: string }>;
    key: string;
    keySecret: string;
    currency: string;
    name: string;
    description: string;
    prefillName: string;
    prefillEmail: string;
    prefillContact: string;
    notesAddress: string;
    aws: any;
    roadDealerLogo: any;
    ScreenIds: any;
    API_BASE_URL: string | any;
} = {
    dateFormat: "yyyy-dd-LL",
    dateTimeFormat: "MM/dd/yyyy hh:mm aa",
    list: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
        { label: "Other", value: "M/F" },
        { label: "Unknown", value: "U" }
    ],
    key: "rzp_test_CpptPcW1kcsskI",
    keySecret: "eCUJ7OKd6yFUELv3IOeqCcxv",
    currency: "INR",
    name: "QUIXSTART",
    description: "for_Testing",
    prefillName: "Pragg",
    prefillEmail: "pragg@wcc.com",
    prefillContact: "9677731132",
    notesAddress: "Razor Corporate",
    ScreenIds: [7, 9],
    aws: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION,
        bucketName: process.env.REACT_APP_BUCKET_NAME
    },
    roadDealerLogo: process.env.REACT_APP_ROAD_DEALER_LOGO,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL
};
export const RolesData = {
    SuperAdmin: {
        RoleId: 1,
        RoleName: "Super Admin",
        RoleValue: "SA"
    },
    RoadDealerAdmin: {
        RoleId: 2,
        RoleName: "Road Dealer Admin",
        RoleValue: "RDA"
    },
    DealerAdmin: {
        RoleId: 3,
        RoleName: "Dealer Admin",
        RoleValue: "DA"
    },
    DealerBuyerOrSeller: {
        RoleId: 4,
        RoleName: "Buyer/Seller",
        RoleValue: "BS"
    }
};

export const jsonConfig = {
    Authentication: "emailLogin",
    Payments: "stripe",
    Media: "vimeo",
    base64Logo: "",
    NavBar: { position: "left" }
};
export const ScreenData = {
    UserStatus: {
        Screen_Id: 1,
        ScreenName: "User Status"
    },
    ProductDetails: {
        Screen_Id: 2,
        ScreenName: "Product Details"
    },
    Bidmanagement: {
        Screen_Id: 3,
        ScreenName: "Bid management"
    },
    Bids: {
        Screen_Id: 4,
        ScreenName: "Bids"
    },
    Inventory: {
        Screen_Id: 5,
        ScreenName: "Inventory"
    },
    Dealers: {
        Screen_Id: 6,
        ScreenName: "Dealers"
    },
    Administrators: {
        Screen_Id: 7,
        ScreenName: "Administrators"
    },
    Home: {
        Screen_Id: 8,
        ScreenName: "Home"
    },
    RoleManagement: {
        Screen_Id: 9,
        ScreenName: "Role Management"
    },
    MyBids: {
        Screen_Id: 10,
        ScreenName: "My Bids"
    }
};
