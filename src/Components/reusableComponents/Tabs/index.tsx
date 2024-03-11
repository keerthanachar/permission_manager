import React, { useState } from "react";

import { Box, Tab, Tabs } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleTabs } from "../../../Redux/Reducer";

import { DynamicTabsProps } from "./types";

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Box role="tabpanel" hidden={value !== index} id={`tab-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && <Box>{children}</Box>}
        </Box>
    );
}

const TabsComponent: React.FC<DynamicTabsProps> = ({ tabData }) => {
    const { SwitchTab } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [value, setValue] = useState<any>(tabData[0].value);
    const [tabs, setTabs] = useState<any>(tabData);
    const handleChange = (e?: any, type?: any) => {
        if (type === "tab") {
            setValue(e?.target?.textContent);
        } else {
            const currentIndex = tabData.findIndex((tab: any) => tab.value === value);
            const nextIndex = (currentIndex + 1) % tabData.length;
            const makeTabFalse = tabs?.map((tab: any) => {
                if (tab.value === tabData[nextIndex].value) {
                    return { ...tab, disabled: false };
                }
                return tab;
            });
            setTabs(makeTabFalse);
            setValue(tabData[nextIndex].value);
            dispatch(handleTabs(false));
        }
    };
    const CallTab: any = SwitchTab ? handleChange(null, "button") : null;
    // eslint-disable-next-line no-console
    console.log("CallTab: ", CallTab);
    // const handleSubmit = (e: any) => {
    // };
    // eslint-disable-next-line const-case/uppercase
    return (
        <Box component="div" sx={{ width: "100%" }} p={3}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={(e) => handleChange(e, "tab")}
                    sx={{
                        "& .MuiTabs-indicator": { backgroundColor: tabData[0].tabColor ? tabData[0].tabColor : "#3F4254" },
                        "& .Mui-selected": {
                            color: tabData[0].color ? tabData[0].color : "#3F4254"
                        }
                    }}
                >
                    {tabs.map((tab: { value: any; label: any; disabled: boolean }) => (
                        <Tab
                            key={tab?.value}
                            value={tab?.value}
                            label={tab?.label}
                            disabled={tab?.disabled}
                            sx={{
                                textTransform: "none",
                                color: "#3F4254",
                                fontWeight: 700,
                                ":disabled": { color: "#3F4254" }
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box>
                {tabs.map((tab: any) => (
                    <TabPanel key={tab?.value} value={value} index={tab?.value}>
                        {tab?.content}
                    </TabPanel>
                ))}
            </Box>
        </Box>
    );
};

export default TabsComponent;
