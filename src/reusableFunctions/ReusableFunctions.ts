import AWS from "aws-sdk";
import { differenceInYears, format } from "date-fns";
import { isArray } from "lodash";

import { config } from "../config";
import { FormData } from "../Types/InputProps";

export const DateValidation = (item: FormData, value: string | string[]) => {
    let error = "";
    if (typeof value === "string") {
        const currentDate = new Date(format(new Date(), config.dateFormat));
        const userDate = new Date(format(new Date(value), config.dateFormat));
        if (item.MaxValue) {
            if (item.MaxValue === "now" && currentDate < userDate) error = `${item.Label} should not be a future date`;
            else if (item.MaxValue?.includes("/") && new Date(item.MaxValue) < userDate) error = `${item.Label} must be below ${item.MaxValue}`;
            else if (
                !item.MaxValue?.includes("/") &&
                item.MaxValue !== "now" &&
                differenceInYears(currentDate, userDate) > parseInt(item.MaxValue, 10)
            )
                error = `${item.Label} must be ${item.MaxValue} years old or above`;
        }
        if (item.MinValue) {
            if (item.MinValue === "now" && currentDate > userDate) error = `${item.Label} should be a current/future date`;
            else if (item.MinValue?.includes("/") && userDate < new Date(item.MinValue || "")) error = `${item.Label} must be above ${item.MinValue}`;
            else if (
                !item.MinValue?.includes("/") &&
                item.MinValue !== "now" &&
                differenceInYears(currentDate, userDate) < parseInt(item.MinValue, 10)
            )
                error = `${item.Label} must be under ${item.MinValue} years old`;
        }
        return error;
    }
    if (typeof value === "object" && value.length) {
        value.forEach((date: string) => {
            const currentDate = new Date(format(new Date(), config.dateFormat));
            const userDate = new Date(format(new Date(date), config.dateFormat));

            if (item.MaxValue) {
                if (item.MaxValue === "now" && currentDate < userDate) error = `${item.Label} should not be a future date`;
                else if (item?.MaxValue?.includes("/") && new Date(item.MaxValue) < userDate) error = `${item.Label} must be below ${item.MaxValue}`;
                else if (
                    !item.MaxValue?.includes("/") &&
                    item.MaxValue !== "now" &&
                    differenceInYears(currentDate, userDate) > parseInt(item.MaxValue, 10)
                )
                    error = `${item.Label} must be ${item.MaxValue} years old or above`;
            }
            if (item.MinValue) {
                if (item.MinValue === "now" && currentDate > userDate) error = `${item.Label} should be a current/future date`;
                else if (item.MinValue?.includes("/") && userDate < new Date(item.MinValue)) error = `${item.Label} must be above ${item.MinValue}`;
                else if (
                    !item.MinValue?.includes("/") &&
                    item.MinValue !== "now" &&
                    differenceInYears(currentDate, userDate) < parseInt(item.MinValue, 10)
                )
                    error = `${item.Label} must be under ${item.MinValue} years old`;
            }
        });
        if (!error && value.length < item.Multiple) return `Minimum ${item.Multiple} ${item.Label} record is Required*`;
        return error ? item.RegExError || `Incorrect ${item.Label}` : "";
    }
    return "";
};
export const RegExValidation = (item: FormData, value: any) => {
    let error: string = "";
    const regex: RegExp = new RegExp(item?.Regex?.join("\\") ?? "");
    if (item?.Regex?.length && typeof value === "string") {
        if (!regex.test(value)) error = item.RegExError || `Please enter correct ${item.Label}`;
    } else if (isArray(value) && item?.Regex?.length) {
        const someOne = value.some((e: any) => !regex.test(e));
        if (value && value?.length === 0) error = item.ErrorMessage;
        else if (someOne) error = `Incorrect ${item.Label}`;
        else if (value.length < item.Multiple) error = `Minimum ${item.Multiple} ${item.Label} record is Required*`;
        else if (value.length < (item.Multiple || 1)) error = `Minimum ${item.Multiple || 1} ${item.Label} record is Required*`;
    }
    return error;
};
export const validateFormOnSubmit = (values: any, ArrayRecord: Array<any>) => {
    const errors: any = {};

    ArrayRecord.forEach((FieldData) => {
        FieldData.forEach((item: FormData) => {
            if (item?.Type === "date") {
                if (item.Required && !isArray(values[item.Name])) {
                    if (
                        !values[item.Name] ||
                        (parseInt(values?.[item.Name] !== null ? values?.[item.Name]?.split("/")?.[2] : "0", 10) || 0) <= 1000
                    ) {
                        errors[item.Name] = item.ErrorMessage;
                    } else if ((parseInt(values?.[item.Name] !== null ? values?.[item.Name]?.split("/")?.[2] : "0", 10) || 0) > 1000) {
                        // const errorData = DateValidation(item, values[item.Name]);
                        // if (errorData) errors[item.Name] = errorData;
                    }
                } else if (item.Required && isArray(values[item.Name])) {
                    if (!values[item.Name]?.length) {
                        errors[item.Name] = item.ErrorMessage;
                    } else if (values[item.Name]?.some((e: string) => parseInt(e?.split("/")?.[2], 10) <= 1000)) {
                        errors[item.Name] = item.RegExError || `Incorrect ${item.Label}`;
                    } else {
                        // const errorData = DateValidation(item, values[item.Name]);
                        // if (errorData) errors[item.Name] = errorData;
                    }
                } else if (typeof values[item.Name] === "string" ? values[item.Name] : values[item.Name]?.length) {
                    // const errorData = DateValidation(item, values[item.Name]);
                    // if (errorData) errors[item.Name] = errorData;
                }
            }
            if (item.Type === "text" || item.Type === "number" || item.Type === "TextArea") {
                if (item.Required && typeof values[item.Name] === "string") {
                    if (values[item.Name]) {
                        const error: string = RegExValidation(item, values[item.Name]);
                        if (error) errors[item.Name] = error;
                    } else {
                        errors[item.Name] = item.ErrorMessage;
                    }
                } else if (item.Required && typeof values[item.Name] === "object") {
                    if (values[item.Name]?.length) {
                        const error: string = RegExValidation(item, values[item.Name]);
                        if (
                            !error &&
                            values[item.Name].length !== [...(new Set(values[item.Name].map((e: string) => e?.trim()?.toLowerCase())) as any)].length
                        ) {
                            errors[item.Name] = "Duplicate Entry";
                        } else if (error) errors[item.Name] = error;
                    } else {
                        errors[item.Name] = item.ErrorMessage;
                    }
                } else if (typeof values[item.Name] === "string" ? values[item.Name] : values[item.Name]?.filter((e: string) => e)?.length) {
                    const error: string = RegExValidation(item, values[item.Name]);
                    if (error) errors[item.Name] = error;
                }
            }
            if (item.Type === "select") {
                if (item.Required) {
                    if (isArray(values[item.Name])) {
                        if (!values?.[item.Name]?.length) {
                            errors[item.Name] = item.ErrorMessage;
                        } else if (values?.[item.Name]?.length < item.Multiple)
                            errors[item.Name] = `Minimum ${item.Multiple} ${item.Label} record is Required*`;
                    } else if (!(typeof values?.[item.Name] === "string" ? values?.[item.Name] : values?.[item.Name]?.label))
                        errors[item.Name] = item.ErrorMessage;
                } else if (values?.[item.Name]) {
                    if (item.Multiple && values?.[item.Name]?.length && values?.[item.Name].length < item.Multiple)
                        errors[item.Name] = `Minimum ${item.Multiple} ${item.Label} record is Required*`;
                }
            }
            if (item.Type === "checkbox" || item.Type === "switch") {
                if (item.Required && !values[item.Name]) errors[item.Name] = item.ErrorMessage;
            }
            if (item.Type === "number") {
                if (item.Required && !values[item.Name]) errors[item.Name] = item.ErrorMessage;
            }
            if (item.Type === "radio") {
                if (item.Required && !values[item.Name]) errors[item.Name] = item.ErrorMessage;
            }
            if (item.Type === "checkboxContainer") {
                if (!item.Multiple) {
                    if (item.Required && !values[item.Name]?.TestNumber) errors[item.Name] = item.ErrorMessage;
                } else if (item.Required && !values[item.Name]?.length) errors[item.Name] = item.ErrorMessage;
                else if (values[item.Name]?.length ? values[item.Name]?.length < item.Multiple : false)
                    errors[item.Name] = "Please choose atlease 2 items";
            }
            if (item.Type === "file" && item.Required) {
                if (item?.additionalData?.mainObject && !values?.[item?.additionalData?.mainObject]?.[item?.Name]) {
                    errors[item.Name] = item.ErrorMessage;
                } else if (!item?.additionalData?.mainObject && !values?.[item?.Name]) {
                    errors[item.Name] = item.ErrorMessage;
                }
            }
            if (item.Type === "phoneNumber") {
                if (item.Required) {
                    const phoneNumber = values[item.Name];
                    if (!isArray(phoneNumber)) {
                        if (!phoneNumber || phoneNumber.length !== 12) {
                            errors[item.Name] = item.ErrorMessage; // Modify the error message as needed
                        }
                    } else if (!phoneNumber.length) {
                        errors[item.Name] = item.ErrorMessage; // Modify the error message as needed
                    } else if (phoneNumber.some((num) => num.length !== 12)) {
                        errors[item.Name] = "Please enter valid phone numbers"; // Modify the error message as needed
                    }
                }
            }
            // Logic Speciallt for Insurance Modal
            // additionalFieldValidation(item, errors, values);
        });
    });
    // additionalValidationRules(errors, values);

    return errors;
};

export const getFileUrl = async (file: any) => {
    AWS.config.update({
        region: config.aws.region || "",
        accessKeyId: config.aws.accessKeyId || "",
        secretAccessKey: config.aws.secretAccessKey || ""
    });

    const s3 = new AWS.S3();
    const params = {
        Bucket: config.aws.bucketName || "roaddealer-images",
        Key: file.name,
        Body: file
    };
    try {
        const upload = await s3.upload(params).promise();
        return upload;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error", error);
        return error;
    }
};
export function formatTimestamp(timestamp: any) {
    const now: any = new Date();
    const messageDate: any = new Date(timestamp);

    if (now - messageDate < 60 * 1000) {
        // Less than a minute ago
        return "Just now";
    }
    if (now - messageDate < 60 * 60 * 1000) {
        // Less than an hour ago
        const minutesAgo = Math.floor((now - messageDate) / (60 * 1000));
        return `${minutesAgo}m ago`;
    }
    if (now - messageDate < 24 * 60 * 60 * 1000) {
        // Less than a day ago
        const hoursAgo = Math.floor((now - messageDate) / (60 * 60 * 1000));
        return `${hoursAgo}h ago`;
    }
    // More than a day ago
    const options = { hour: "numeric", minute: "numeric" };
    return messageDate.toLocaleTimeString(undefined, options);
}

// eslint-disable-next-line consistent-return
export const formatDayTime = (timestamp: any) => {
    const now: any = new Date();
    const messageDate: any = new Date(timestamp);
    if (now - messageDate < 24 * 60 * 60 * 1000) {
        return "Today";
    }
    if ((now - messageDate) / (24 * 60 * 60 * 1000)) {
        const daysAgo = Math.floor((now - messageDate) / (24 * 60 * 60 * 1000));
        if (daysAgo === 1) {
            return "Yesterday";
        }
        if (daysAgo >= 2 && daysAgo <= 6) {
            // Display the weekday for messages within the last week
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return weekdays[messageDate.getDay()];
        }
        // More than a week ago, display in days
        return `${daysAgo}d ago`;
    }
};

export const convertPhoneNumberFormat = (phone: any) => {
    let formatPhoneNumber = "";
    if (phone.length >= 3) {
        formatPhoneNumber = `${phone.slice(0, 3)}-`;
    }
    if (phone.length >= 7) {
        formatPhoneNumber = `${phone.slice(0, 7)}-`;
    }
    if (phone.length >= 10) {
        formatPhoneNumber = `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return formatPhoneNumber;
};
const isSameDay = (date1: any, date2: any) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};

const getYesterday = (date: any) => {
    const yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);
    return yesterday;
};

const isSameWeek = (date1: any, date2: any) => {
    const firstDayOfWeek = new Date(date2);
    firstDayOfWeek.setDate(date2.getDate() - date2.getDay());
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return date1 >= firstDayOfWeek && date1 <= lastDayOfWeek;
};
export const filterMessagesByDate = (messages: any) => {
    const today = new Date();
    const currentDate = new Date();
    const todayMessages: any = [];
    const yesterdayMessages: any = [];
    const thisWeekMessages: any = [];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    messages.forEach((message: any) => {
        const messageDate = new Date(message?.Message_DT);
        if (isSameDay(messageDate, currentDate)) {
            todayMessages.push(message);
        } else if (isSameDay(messageDate, getYesterday(currentDate))) {
            yesterdayMessages.push(message);
        }
        if (isSameWeek(messageDate, currentDate)) {
            thisWeekMessages.push(message);
        }
    });

    return {
        todayMessages,
        yesterdayMessages,
        thisWeekMessages
    };
};
