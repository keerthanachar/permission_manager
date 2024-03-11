import { format } from "date-fns";

import { config } from "../../../config";

const getDate = (date: any) => {
    try {
        if (date && date?.length < 9) return "";
        if (format(new Date(date), config.dateFormat) === date) return new Date(date);
        return "";
    } catch (error) {
        return error;
    }
};
export { getDate };
