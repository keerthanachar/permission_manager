import { Country, State } from "country-state-city";

import { InitialState } from "./types";

export const initialState: InitialState = {
    user: {},
    bidsCarDetails: {},
    alertNotification: {
        open: false,
        position: { vertical: "top", horizontal: "right" },
        message: "",
        duration: 5000,
        closableOnBackDropClick: true,
        type: "info",
        transitionState: {
            grow: true
        }
    },
    breakPoints: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false
    },
    modal: {
        open: false,
        modelTitle: "",
        type: "Login"
    },
    chatmodal: {},
    ChatData: { chatReply: false, RoomId: "", InventryID: 0, BidId: 0 },
    productImages: {
        images: [],
        index: ""
    },
    BuyFigureImages: {
        images: [],
        index: ""
    },
    errorState: {},
    SwitchTab: false,
    Roles: [],
    HomePageNavigation: "",
    // Inventory
    InventoryList: [],
    BidManagement: [],
    // Products
    ProductListData: [],
    GarageProductList: [],
    PrivateProductList: [],
    productLoader: { loading: false, status: false, data: "" },
    editInventory: {},
    // States Data
    CAstates: State?.getStatesOfCountry("CA")?.map((e: any) => ({ label: e.name, value: e.isoCode })),
    USstates: State?.getStatesOfCountry("US")?.map((e: any) => ({ label: e.name, value: e.isoCode })),
    CATimeZones: Country?.getCountryByCode("CA")?.timezones?.map((e: any) => ({ label: e.zoneName, value: e.abbreviation })),
    USTimeZones: Country?.getCountryByCode("US")?.timezones?.map((e: any) => ({ label: e.zoneName, value: e.abbreviation })),
    productDetail: {},
    TotalBids: [],
    // Role management
    RoleManagementData: [],
    rolesLoader: { loading: false, status: false, data: "" },
    // RD Admins
    RoadDealerAdmins: [],
    updateRoadDealerAdmin: {},
    // dealer
    dealers: [],
    updatedDealer: {},
    // dealerUsers
    dealerUsers: [],
    updateDealerUser: {},

    userLoader: { loading: false, status: false, data: "" },

    dealerLoader: { loading: false, status: false, data: "" },
    quoteLoader: { loading: false, status: false, data: "" },
    loaderState: { loading: false, status: false, data: "" },
    // Reachout
    ReachoutsData: [],
    FilteredRequests: [],
    reachOutLoader: { loading: false, status: false, data: "" },

    // Chats Related States
    SelectedUser: {},
    ChatMessageWindow: [],
    ChatUsersList: [],
    chatLoader: { loading: false, status: false, data: "" },
    NotificationsLoader: { loading: false, status: false, data: "" },
    ArchiveChats: [],
    Notifications: [],

    // Filter State
    ClearAll: { ClearAll: "", Year: "", Price: "", Make: "", Mileage: "", Transmission: "", Model: "", Trim: "", Engine: "", Color: "" },
    theme: {
        paperTheme: {
            dark: {
                borderRadius: 0
            },
            light: {
                borderRadius: 10
            }
        },
        mode: "light",
        testBoxSelected: {
            dark: { bgcolor: "#619C8A", color: "white" },
            light: { bgcolor: "#243D4D", color: "White" }
        },
        testBoxDisabled: {
            dark: { bgcolor: "#1d1d1d4d", color: "white" },
            light: { bgcolor: "#4343434a", color: "black" }
        },
        testBoxNotSelected: {
            dark: { bgcolor: "#646363", color: "white" },
            light: { bgcolor: "white", color: "black" }
        },
        locationHeader: {
            dark: { bgcolor: "#243D4D", color: "white" },
            light: { bgcolor: "#243D4D", color: "white" }
        },
        checkBoxAndRadioBox: {
            dark: {
                color: "yellow",
                "&.Mui-checked": {
                    color: "yellow"
                },
                "&.Mui-disabled": {
                    color: "green"
                }
            },
            light: {
                color: "#646464",
                "&.Mui-checked": {
                    color: "#288d55"
                },
                "&.Mui-disabled": {
                    color: "#E2E2E2"
                }
            }
        },
        switchComponent: {
            dark: {
                width: 28,
                height: 16,
                display: "flex",
                padding: 0,
                "& .MuiSwitch-switchBase": {
                    padding: 2,
                    "&.Mui-checked": {
                        transform: "translateX(12px)",
                        color: "#101010",
                        "& + .MuiSwitch-track": {
                            opacity: 1,
                            backgroundColor: "yellow"
                        }
                    }
                },
                "& .MuiSwitch-thumb": {
                    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#101010"
                },
                "& .MuiSwitch-track": {
                    borderRadius: 16 / 2,
                    opacity: 1,
                    backgroundColor: "red",
                    boxSizing: "border-box"
                }
            },
            light: {
                width: 36,
                height: 20,
                display: "flex",
                padding: 0,
                "& .MuiSwitch-switchBase": {
                    padding: 2,
                    "&.Mui-checked": {
                        transform: "translateX(16px)",
                        color: "#fff",
                        "& + .MuiSwitch-track": {
                            opacity: 1,
                            backgroundColor: "#A462FF"
                        }
                    }
                },
                "& .MuiSwitch-thumb": {
                    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: "#FFFF"
                },
                "& .MuiSwitch-track": {
                    borderRadius: 10,
                    opacity: 1,
                    backgroundColor: "#646464",
                    boxSizing: "border-box"
                }
            }
        },
        dropDownList: {
            light: {
                notSelected: {
                    bgcolor: "white",
                    color: "black"
                },
                selected: {
                    bgcolor: "#FAC21A !important",
                    color: "black"
                },
                disabled: {
                    opacity: 0.5,
                    cursor: "not-allowed",
                    pointerEvents: "all !important"
                }
            }
        },
        backGroundTheming: {
            dark: {
                text: {
                    primary: "#487A99",
                    secondary: "#C7C7C7",
                    disabled: "#E0E0E0"
                },
                background: { default: "#fff", paper: "#1E1E1E" },
                divider: "#619C8A"
            },
            light: {
                background: {
                    default: "#f0f0f5",
                    paper: "#fff"
                },
                divider: "#243D4D",
                text: {
                    primary: "#010101",
                    secondary: "#010101",
                    disabled: "#101010"
                }
            }
        },

        chip: {
            dark: {
                backgroundColor: ""
            }
        },
        primaryColor: {
            light: {
                main: "#243D4D"
            },
            dark: {
                main: "#619C8A"
            }
        },
        secondaryColor: {
            light: {
                main: "#243D4D"
            },
            dark: {
                main: "#619C8A"
            }
        },
        errorColor: {
            light: {
                main: "#d32f2f"
            },
            dark: {
                main: "#f44336"
            }
        },
        warningColor: {
            light: {
                main: "#ed6c02"
            },
            dark: {
                main: "#ffa726"
            }
        },
        infoColor: {
            light: {
                main: "#0288d1"
            },
            dark: {
                main: "#29b6f6"
            }
        },
        successColor: {
            light: {
                main: "#248900 !important"
            },
            dark: {
                main: "#68FF89"
            }
        },
        buttonTheme: {
            dark: {
                filled: {
                    main: {
                        bgcolor: "#000",
                        color: "#fff"
                    },
                    hover: {
                        bgcolor: "#000",
                        color: "#fff"
                    },
                    focus: {
                        bgcolor: "#FCA523",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    active: {
                        bgcolor: "#FF802E",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    disabled: {
                        bgcolor: "#1010101F",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                outlined: {
                    main: {
                        bgcolor: "#FF802E",
                        color: "rgba(255, 255, 255, 1)"
                    },
                    hover: {
                        bgcolor: "#004069",
                        color: "#101010"
                    },
                    focus: {
                        bgcolor: "#243D4D",
                        color: "#101010"
                    },
                    active: {
                        bgcolor: "#619C8A",
                        color: "#101010"
                    },
                    disabled: {
                        bgcolor: "#FF802E29",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                elavated: {
                    main: {
                        bgcolor: "#FFFFFF",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    hover: {
                        bgcolor: "#FAC21A8C",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    focus: {
                        bgcolor: "#004069",
                        color: "rgba(255, 255, 255, 1)"
                    },
                    active: {
                        bgcolor: "#243D4D",
                        color: "rgba(255, 255, 255, 1)"
                    },
                    disabled: {
                        bgcolor: "#E2E2E2",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                tonal: {
                    main: {
                        bgcolor: "#FAC21A",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    hover: {
                        bgcolor: "#FAC21A8C",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    focus: {
                        bgcolor: "#FAC21ACC",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    active: {
                        bgcolor: "#FAC21A",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    disabled: {
                        bgcolor: "#E2E2E2",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                text: {
                    main: {
                        bgcolor: "#FFFFFF",
                        color: "rgba(255, 255, 255, 1)"
                    },
                    hover: {
                        bgcolor: "#C7C7C7",
                        color: "rgba(0, 64, 105, 1)"
                    },
                    focus: {
                        bgcolor: "#FAC21A",
                        color: "rgba(0, 64, 105, 1)"
                    },
                    active: {
                        bgcolor: "#FAC21A26",
                        color: "rgba(0, 64, 105, 1)"
                    },
                    disabled: {
                        bgcolor: "#E2E2E2",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                defaultOptions: {
                    ":disabled": {
                        cursor: "not-allowed",
                        pointerEvents: "all"
                    }
                }
            },
            light: {
                filled: {
                    main: {
                        bgcolor: "#000",
                        color: "#fff"
                    },
                    hover: {
                        bgcolor: "#000",
                        color: "#fff"
                    },
                    focus: {
                        bgcolor: "#000",
                        color: "#fff"
                    },
                    active: {
                        bgcolor: "#000",
                        color: "#fff"
                    },
                    disabled: {
                        bgcolor: "#1010101F",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                outlined: {
                    main: {
                        bgcolor: "#00000",
                        color: "#101010"
                    },
                    hover: {
                        bgcolor: "#004069",
                        color: "#101010"
                    },
                    focus: {
                        bgcolor: "#243D4D",
                        color: "#101010"
                    },
                    active: {
                        bgcolor: "#619C8A",
                        color: "#101010"
                    },
                    disabled: {
                        bgcolor: "#FF802E29",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                elavated: {
                    main: {
                        bgcolor: "#FFFFFF",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    hover: {
                        bgcolor: "#FAC21A8C",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    focus: {
                        bgcolor: "#A462FF",
                        color: "#FFF"
                    },
                    active: {
                        bgcolor: "#a76bcf",
                        color: "#FFF"
                    },
                    disabled: {
                        bgcolor: "#E2E2E2",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                tonal: {
                    main: {
                        bgcolor: "#FAC21A",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    hover: {
                        bgcolor: "#FAC21A8C",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    focus: {
                        bgcolor: "#FAC21ACC",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    active: {
                        bgcolor: "#FAC21A",
                        color: "rgba(16, 16, 16, 1)"
                    },
                    disabled: {
                        bgcolor: "#E2E2E2",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                text: {
                    main: {
                        bgcolor: "#FFFFFF",
                        color: "rgba(0, 64, 105, 1)"
                    },
                    hover: {
                        bgcolor: "#C7C7C7",
                        color: "rgba(0, 64, 105, 1)"
                    },
                    focus: {
                        bgcolor: "#FAC21A",
                        color: "rgba(0, 64, 105, 1)"
                    },
                    active: {
                        bgcolor: "#FAC21A26",
                        color: "rgba(0, 64, 105, 1)"
                    },
                    disabled: {
                        bgcolor: "#E2E2E2",
                        color: "rgba(16, 16, 16, 0.12)"
                    }
                },
                defaultOptions: {
                    ":disabled": {
                        cursor: "not-allowed",
                        pointerEvents: "all"
                    }
                }
            }
        },
        textFields: {
            dark: {
                borderRadius: "0px !important"
            },
            light: {
                borderRadius: "0px !important"
            }
        },
        alert: {
            dark: {
                error: {
                    backgroundColor: "transparent",
                    border: "1px solid red"
                }
            },
            light: {
                error: {
                    backgroundColor: "red",
                    color: "white"
                }
            }
        }
    },
    inventoryLoader: {},
    productFilterLoader: false,
    chatRoom: [],
    // Garage
    myGarage: [],
    GarageData: {},
    garageLoader: { loading: false, status: false, data: "" },
    // BuyFigure
    PrivateBuyFigureData: [],
    BuyFigureData: [],
    buyFigureDetail: [],
    buyFigureLoader: { loading: false, status: false, data: "" },
    // Quotes
    quoteDetails: [],
    // right drawer
    drawerState: {
        open: false
    },
    UpdatedQuoteData: [],
    View: { Inventory: 0, Product: 0, BidManagement: 0, MyBids: 0, BuyFigure: 0 },
    // private network
    PrivateNetworkLoader: { loading: false, status: false, data: "" },
    PrivateNetworkData: [],
    UpdatePrivateNetworks: [],
    chatWindowView: false
};
