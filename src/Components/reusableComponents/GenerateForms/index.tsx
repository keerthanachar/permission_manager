import React from "react";

import { Box, Grid, Typography } from "@mui/material";

import { FormData } from "../../../Types/InputProps";
import CheckBox from "../Checkbox";
import DatePicker from "../DatePickers";
import Input from "../Input";
import MultipleDatePicker from "../MultipleDatePickers";
import MultipleInput from "../MultipleInput";
import NumberInput from "../NumberInput";
import PhoneNumberInput from "../NumberInput/phonedail";
import RadioButtons from "../Radio";
import Select from "../Select";
import SelectMultiple from "../SelectMultiple";
import SwitchComponent from "../SwitchComponent";
import TextArea from "../TextArea";

import { GenerateFormProps } from "./types";

// eslint-disable-next-line @typescript-eslint/no-shadow
const GenerateForm: React.FC<GenerateFormProps> = ({ FormData, FormikProps, lg = 12, sm = 12, xs = 12, xl = 12, md = 12, spacing, gap }) => {
    const { values, errors, touched, handleBlur, setFieldTouched, setFieldValue } = FormikProps;
    if (!FormData?.length) return <> </>;
    return (
        <Grid container spacing={spacing || 2} gap={gap}>
            {FormData.map((item: FormData, i: any) => {
                return (
                    <Grid item lg={lg} sm={sm} xs={xs} xl={xl} md={md} key={i}>
                        <Box key={item.Name} width="100%">
                            {item.Type === "text" || item.Type === "password" ? (
                                item.Multiple ? (
                                    <MultipleInput
                                        helperText={item.HelperText}
                                        id={item.Name + item.Categery}
                                        name={item.Name}
                                        value={values?.[item.Name]?.length ? values?.[item.Name]?.map((e: string) => e) : []}
                                        error={Boolean(touched[item.Name] && errors[item.Name])}
                                        label={item.Label}
                                        onChange={(value: any) => setFieldValue(item.Name, value)}
                                        onBlur={handleBlur}
                                        regEx={item.Regex}
                                        errorText={errors[item.Name]}
                                        toolTip={item.Tooltip}
                                        required={item.Required}
                                        item={item}
                                        rows={item.rows}
                                    />
                                ) : (
                                    <>
                                        <Typography variant="body2" fontWeight={700}>
                                            {item?.Header || ""}
                                        </Typography>
                                        <Input
                                            value={values[item.Name] ?? ""}
                                            label={item.Label}
                                            name={item.Name}
                                            type={item.Type}
                                            toolTip={item.Tooltip}
                                            required={item.Required}
                                            onChange={(value: any) => setFieldValue(item.Name, value)}
                                            error={Boolean(touched[item.Name] && errors[item.Name])}
                                            helperText={item.HelperText}
                                            errorText={errors[item.Name] ?? ""}
                                            id={item.Label}
                                            disabled={item.Disabled}
                                            readOnly={item.ReadOnly}
                                            onBlur={handleBlur}
                                            rows={item.rows}
                                            placeHolder={item.PlaceHolder}
                                            regexPattern={item.Regex}
                                            sx={item?.AdditionalData}
                                        />
                                    </>
                                )
                            ) : item.Type === "select" ? (
                                item.Multiple ? (
                                    <SelectMultiple
                                        value={values[item.Name]}
                                        label={item.Label}
                                        name={item.Name}
                                        toolTip={item.Tooltip}
                                        required={item.Required}
                                        onChange={(value: any) => {
                                            setFieldValue(item.Name, value);
                                        }}
                                        error={Boolean(touched[item.Name] && errors[item.Name])}
                                        helperText={item.HelperText}
                                        errorText={errors[item.Name]}
                                        id={item.Label}
                                        onBlur={handleBlur}
                                        list={item.List ?? []}
                                    />
                                ) : (
                                    <>
                                        <Typography variant="body2" fontWeight={700}>
                                            {item?.Header || ""}
                                        </Typography>
                                        <Select
                                            value={values[item.Name]}
                                            label={item.Label}
                                            name={item.Name}
                                            toolTip={item.Tooltip}
                                            required={item.Required}
                                            onChange={(value: any) => {
                                                setFieldValue(item.Name, value);
                                            }}
                                            error={Boolean(touched[item.Name] && errors[item.Name])}
                                            helperText={item.HelperText}
                                            errorText={errors[item.Name]}
                                            id={item.Label}
                                            onBlur={handleBlur}
                                            list={item.List ?? []}
                                            allowAddList={item?.additionalData?.allowAddList}
                                            disabled={item.Disabled}
                                            placeHolder={item.PlaceHolder}
                                            readOnly={item.ReadOnly}
                                        />
                                    </>
                                )
                            ) : item.Type === "date" ? (
                                item.Multiple ? (
                                    <MultipleDatePicker
                                        id={item.Name + item.Categery}
                                        name={item.Name}
                                        value={values?.[item.Name]?.length ? values?.[item.Name]?.map((e: string) => e) : null}
                                        error={Boolean(touched[item.Name] && errors[item.Name])}
                                        label={item.Label}
                                        onChange={(value) => setFieldValue(item.Name, value)}
                                        onBlur={handleBlur}
                                        errorText={errors[item.Name]}
                                        toolTip={item.Tooltip}
                                        required={item.Required}
                                        item={item}
                                        minDate={item.MinValue?.includes("/") ? item.MinValue : null}
                                        maxDate={item.MaxValue?.includes("/") ? item.MaxValue : null}
                                        setFieldTouched={setFieldTouched}
                                        helperText={item.HelperText}
                                    />
                                ) : (
                                    <DatePicker
                                        item={item}
                                        value={values[item.Name] ?? ""}
                                        onChange={(value: any) => {
                                            if (value?.target?.value) setFieldValue(item.Name, value?.target?.value);
                                            else setFieldValue(item.Name, value);
                                        }}
                                        error={Boolean(touched[item.Name] || errors[item.Name])}
                                        errorText={errors[item.Name] ?? ""}
                                        helperText={item.HelperText}
                                        onBlur={handleBlur}
                                        setFieldTouched={setFieldTouched}
                                        minDate={item.MinValue?.includes("/") ? item.MinValue : null}
                                        maxDate={item.MaxValue?.includes("/") ? item.MaxValue : null}
                                    />
                                )
                            ) : item.Type === "checkbox" ? (
                                <CheckBox
                                    toolTip={item.Tooltip}
                                    id={item.Label + item.Group}
                                    checked={values[item.Name] ?? false}
                                    onChange={(value) => {
                                        setFieldValue(item.Name, value, false);
                                    }}
                                    label={item.Label}
                                    error={Boolean(touched[item.Name] && item.Required && !values[item.Name])}
                                    errorText={errors[item.Name]}
                                    name={item.Name}
                                    onBlur={handleBlur}
                                    disabled={item.Disabled}
                                />
                            ) : item.Type === "radio" ? (
                                <RadioButtons
                                    toolTip={item.Tooltip}
                                    id={item.Group + item.Label}
                                    name={item.Name}
                                    value={values[item.Name]}
                                    error={Boolean(touched[item.Name] || (item.Required && !values[item.Name]))}
                                    errorText={errors[item.Name]}
                                    list={item.List ?? []}
                                    label={item.Label}
                                    onChange={(value) => {
                                        setFieldValue(item.Name, value);
                                    }}
                                    onBlur={handleBlur}
                                    // splitColumns={item.additionalData.splitColumns}
                                />
                            ) : item.Type === "switch" ? (
                                <>
                                    <Typography style={{ color: "#333", fontWeight: "bold" }}>{item?.Header}</Typography>
                                    <SwitchComponent
                                        toolTip={item.Tooltip}
                                        id={item.Label + item.Group}
                                        checked={values[item.Name] ?? false}
                                        onChange={(value) => {
                                            setFieldValue(item.Name, value);
                                        }}
                                        label={item.Label}
                                        error={Boolean(touched[item.Name] && item.Required && !values[item.Name])}
                                        errorText={errors[item.Name]}
                                        name={item.Name}
                                        onBlur={handleBlur}
                                        disabled={item.Disabled}
                                    />
                                </>
                            ) : item.Type === "file" ? (
                                // <Box component="center" sx={{ height: "100%" }} marginX={2}>
                                //     {/* <UploadImage
                                //         onError={() => {
                                //             if (item?.additionalData?.mainObject) {
                                //                 setFieldError(item?.additionalData?.mainObject, item.ErrorMessage);
                                //             } else setFieldError(item.Name, item.ErrorMessage);
                                //         }}
                                //         onUpload={(url: string) => {
                                //             if (item?.additionalData?.mainObject) {
                                //                 let obj: any = values[item?.additionalData?.mainObject] ?? {};
                                //                 obj = {
                                //                     ...obj,
                                //                     [item.Name]: url
                                //                 };
                                //                 setFieldValue(item?.additionalData?.mainObject, obj);
                                //             } else {
                                //                 setFieldValue(item.Name, url);
                                //             }
                                //         }}
                                //         name={item.Name}
                                //         uploadFromDevice={item?.additionalData?.uploadImage}
                                //         capture={item?.additionalData?.captureImage}
                                //         Label={item.Label}
                                //         errorText={item.ErrorMessage}
                                //         error={
                                //             item?.additionalData?.mainObject
                                //                 ? Boolean(submitCount && item.Required && !values?.[item?.additionalData?.mainObject]?.[item.Name])
                                //                 : Boolean(submitCount && item.Required && !values[item.Name])
                                //         }
                                //         toolTip={item.Tooltip}
                                //         subLabel1={item?.additionalData?.subLabel1 || ""}
                                //         subLabel2={item?.additionalData?.subLabel2 || ""}
                                //         subLabel3={item?.additionalData?.subLabel3 || ""}
                                //         initialValue={
                                //             (item?.additionalData?.mainObject
                                //                 ? values?.[item?.additionalData?.mainObject]?.[item.Name] ?? ""
                                //                 : values[item.Name]) || item.InitialValue
                                //         }
                                //     /> */}
                                //     {item.additionalData?.needDivider && (
                                //         <Divider
                                //             variant="middle"
                                //             sx={{
                                //                 paddingY: 1,
                                //                 marginBottom: 5,
                                //                 maxWidth: 600
                                //             }}
                                //             orientation="horizontal"
                                //         />
                                //     )}
                                // </Box>
                                <Box>File</Box>
                            ) : item.Type === "header" ? (
                                <Box width="100%" display="flex" paddingY={0.5} justifyContent="start" gap={2} alignItems="start" position="relative">
                                    <Typography variant="h6">{item.Label}</Typography>
                                </Box>
                            ) : item.Type === "number" ? (
                                <Box>
                                    <Typography variant="body2" fontWeight={700}>
                                        {item?.Header || ""}
                                    </Typography>
                                    <NumberInput
                                        value={values[item.Name] ?? ""}
                                        label={item.Label}
                                        name={item.Name}
                                        type={item.Type}
                                        toolTip={item.Tooltip}
                                        required={item.Required}
                                        onChange={(value: any) => {
                                            setFieldValue(item.Name, value);
                                        }}
                                        error={Boolean(touched[item.Name] && errors[item.Name])}
                                        helperText={item.HelperText}
                                        errorText={errors[item.Name] ?? ""}
                                        id={item.Label}
                                        disabled={item.Disabled}
                                        onBlur={handleBlur}
                                        rows={item.rows}
                                        placeHolder={item.PlaceHolder}
                                        regexPattern={item.Regex}
                                        sx={item?.AdditionalData}
                                        Amount={item.Amount}
                                    />
                                </Box>
                            ) : item.Type === "TextArea" ? (
                                <Box pb={1}>
                                    <Typography variant="body2" pb={1} fontWeight={700}>
                                        {item?.Header || ""}
                                    </Typography>
                                    <TextArea
                                        value={values[item.Name] ?? ""}
                                        label={item.Label}
                                        name={item.Name}
                                        type={item.Type}
                                        toolTip={item.Tooltip}
                                        required={item.Required}
                                        onChange={(value: any) => setFieldValue(item.Name, value)}
                                        error={Boolean(touched[item.Name] && errors[item.Name])}
                                        helperText={item.HelperText}
                                        errorText={errors[item.Name] ?? ""}
                                        id={item.Label}
                                        disabled={item.Disabled}
                                        onBlur={handleBlur}
                                        rows={item.rows}
                                        placeholder={item.PlaceHolder}
                                        regexPattern={item.Regex}
                                        sx={item?.AdditionalData}
                                    />
                                </Box>
                            ) : item.Type === "header" ? (
                                <Box width="100%" display="flex" paddingY={0.5} justifyContent="start" gap={2} alignItems="start" position="relative">
                                    <Typography variant="h6">{item.Label}</Typography>
                                </Box>
                            ) : item.Type === "phoneNumber" ? (
                                <Box>
                                    <Typography variant="body2" fontWeight={700}>
                                        {item?.Header || ""}
                                    </Typography>
                                    <PhoneNumberInput
                                        value={values[item.Name] ?? ""}
                                        label={item.Label}
                                        name={item.Name}
                                        type={item.Type}
                                        toolTip={item.Tooltip}
                                        required={item.Required}
                                        onChange={(value: any) => setFieldValue(item.Name, value)}
                                        error={Boolean(touched[item.Name] && errors[item.Name])}
                                        helperText={item.HelperText}
                                        errorText={errors[item.Name] ?? ""}
                                        id={item.Label}
                                        disabled={item.Disabled}
                                        onBlur={handleBlur}
                                        rows={item.rows}
                                        readOnly={item.ReadOnly}
                                        placeholder={item.PlaceHolder}
                                        regexPattern={item.Regex}
                                        sx={item?.AdditionalData}
                                    />
                                </Box>
                            ) : (
                                <> </>
                            )}
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default GenerateForm;
