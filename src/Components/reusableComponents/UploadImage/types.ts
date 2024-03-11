export interface UploadImageProps {
    capture?: boolean;
    uploadFromDevice?: boolean;
    Label?: string;
    subLabel1?: string;
    subLabel2?: string;
    subLabel3?: string;
    error?: boolean;
    errorText?: string;
    onUpload: (url: string) => void;
    onError: (errorMessage: string) => void;
    initialValue?: string;
    name: string;
    toolTip?: string;
}
