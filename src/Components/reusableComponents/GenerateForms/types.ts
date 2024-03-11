import type { FormikProps } from "formik";

import { FormData } from "../../../Types/InputProps";

export interface GenerateFormProps {
    FormData: FormData[];
    FormikProps: FormikProps<any>;
    lg?: number;
    sm?: number;
    xs?: number;
    xl?: number;
    md?: number;
    spacing?: number;
    gap?: number;
}
