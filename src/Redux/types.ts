import { themeObject } from "../Theme/CustomTheme";

export default {};
export interface BreakPointsProps {
    lg: boolean;
    xl: boolean;
    xs: boolean;
    md: boolean;
    sm: boolean;
}
export interface alertNotificationProps {
    open?: boolean;
    message?: string | any[];
    type?: "error" | "info" | "success" | "warning";
    duration?: number;
    onAction?: (data?: any) => void;
    actionText?: string;
    closeIcon?: boolean;
    closableOnBackDropClick?: boolean;
    position?: { vertical: "top" | "bottom"; horizontal: "center" | "right" | "left" };
    transitionState?: {
        slide?: "up" | "down" | "right" | "left";
        grow?: boolean;
        zoom?: boolean;
    };
}
export interface loaderState {
    loading?: boolean;
    status?: any;
    data?: any;
}
export interface modelProps {
    open?: boolean;
    type?:
        | "Login"
        | "Signup"
        | "VerifyOtp"
        | "Notification"
        | "Administrator"
        | "ProductImage"
        | "AddToGarage"
        | "MyGarageProduct"
        | "Note"
        | "BuyFigureImage"
        | null;
    modelTitle?: string;
    payload?: any;
}
export interface dealersTab {
    value?: string;
    label?: string;
    content?: any;
    index?: number;
    DealerDetails?: string;
    LocationDetails?: string;
    InventoryandList?: string;
}

export interface ReachoutProps {
    ReachOut_ID: number;
    UserID: number;
    DealerID: number;
    Type: string;
    MinYear: string;
    MaxYear: string;
    Make: string;
    Model: string;
    Trim: string;
    MinMiles: string;
    MaxMiles: string;
    MinPrice: string;
    MaxPrice: string;
    Color: string;
    Description: string;
    IsEmailSent: boolean;
    CreatedBy: string | null;
    ModifiedBy: string | null;
    CreatedDate: string | null;
    ModifiedDate: string | null;
    RecordStatus: Boolean;
    RowGUID: string;
    Name: string;
    First_Name: string;
    Last_Name: string;
    Email: string;
    Phone_No: string;
}
export interface NotificationProps {
    Sender_UserId: any;
    Sender_UserName: any;
    Notify: any;
}
export interface viewProps {
    Inventory: any;
    Product: any;
    BidManagement: any;
    MyBids: any;
    BuyFigure: any;
}
export interface InitialState {
    user: any;
    bidsCarDetails: any;
    theme: themeObject;
    breakPoints?: BreakPointsProps;
    modal?: modelProps;
    loaderState?: loaderState;
    Roles: any;
    initalApiStatus?: any;
    alertNotification?: alertNotificationProps;
    chatmodal: any;
    // Country States
    CAstates: any;
    USstates: any;
    // dealers
    dealers?: any;
    updatedDealer?: any;
    // RD Admins
    RoadDealerAdmins?: any;
    updateRoadDealerAdmin?: any;
    // dealer Admins and dealer buyer and seller
    userLoader?: any;
    dealerUsers?: any;
    updateDealerUser?: any;
    // remaining
    dealerByID?: any;
    dealersTab?: dealersTab;
    errorState?: any;
    SwitchTab?: boolean;
    chatNotify?: any;
    ChatData?: any;
    editUserDeatilsData?: any;
    dealerRoleData?: any;
    // Inventory
    InventoryList?: any;
    // BidManagement
    BidManagement?: any;
    TotalBids?: any;
    updateInventoryFilteredData?: any;
    editInventory?: any;
    FiltersData?: any;
    ClearAll?: any;
    dealerState?: any;
    productImages?: any;
    BuyFigureImages?: any;
    // products
    ProductListData?: any;
    GarageProductList?: any;
    PrivateProductList?: any;
    dealerLoader?: any;
    quoteLoader?: any;
    mybids?: any;
    myBidsloaderState?: loaderState;
    productDetail?: any;
    buyFigureDetail?: any;
    quoteDetails?: any;
    dashBoardloaderState?: loaderState;
    dashboardData?: any;
    viewProduct?: any;
    HomePageNavigation?: any;
    inventoryLoader?: any;
    dealerAdminData?: any;
    productFilterLoader?: any;
    RoleManagementData: any;
    myGarage: any;
    GarageData: any;
    rolesLoader?: any;
    garageLoader?: any;
    CATimeZones?: any;
    USTimeZones?: any;
    productLoader?: any;
    chatRoom?: any;
    MultiDealerUser?: any;
    ReachoutsData: ReachoutProps[];
    FilteredRequests: ReachoutProps[];
    reachOutLoader: loaderState;
    // Chat State
    SelectedUser: any;
    ChatUsersList?: any;
    ChatMessageWindow?: any;
    chatLoader: loaderState;
    buyFigureLoader: loaderState;
    NotificationsLoader: loaderState;
    ArchiveChats?: any;
    Notifications?: any;
    // buyfigure
    PrivateBuyFigureData?: any;
    BuyFigureData?: any;
    drawerState?: any;
    UpdatedQuoteData: any;
    // grid/list view
    View: viewProps;
    // private Network
    PrivateNetworkLoader: loaderState;
    PrivateNetworkData: any;
    UpdatePrivateNetworks: any;
    chatWindowView: any;
}
