export const convertObjectParms = (data: any) => {
    const apiParams: any = {
        DealerID: data.DealerID,
        DealerName: data.DealerName?.label,
        StockNo: data.StockNo,
        VIN: data.VIN,
        YearID: data.YearID ?? null,
        Year: data?.Year?.label ?? data?.Year,
        MakeID: data.Make?.value,
        Make: data?.Make?.label,
        ModelID: data.Model?.value,
        Model: data.Model?.label,
        Trim: data.Trim,
        ChromeStyleID: data.ChromeStyleID ?? null,
        ChromeStyle: data.ChromeStyle ?? null,
        BodyId: data.Body?.value,
        Body: data.Body?.label,
        TransID: data.TransName?.value,
        TransName: data.TransName?.label,
        DriveTrainId: data.DriveTrain?.value,
        DriveTrain: data.DriveTrain?.label,
        EngineId: data.Engine?.value,
        Engine: data.Engine?.label,
        ExteriorColorId: data.ExteriorColor?.value,
        ExteriorColor: data.ExteriorColor?.label,
        InteriorColorId: data.InteriorColor?.value,
        InteriorColor: data?.InteriorColor?.label,
        InventoryTypeId: data.InventoryType?.value,
        InventoryType: data.InventoryType?.label,
        OdometerTypeId: data.OdometerType?.value,
        OdometerType: data.OdometerType?.label,
        OdometerReading: data.OdometerReading,
        OEMCertified: data?.OEMCertified?.value ?? null,
        DealerCertified: data?.DealerCertified?.value ?? null,
        RDPrice: data.RDPrice,
        Comments: data.Comments,
        CreatedBy: data.CreatedBy ?? null,
        VehiclePhoto: data.VehiclePhoto,
        ModifiedBy: data?.ModifiedBy ?? null
    };
    return apiParams;
};

export const filterBuyfigureData = (values: any, user: any) => {
    const filterConditions: any = [];
    if (values?.DealerName) {
        filterConditions.push((e: any) => e?.DealerID === values?.DealerName?.value);
    }
    if (values?.Year) {
        filterConditions.push((e: any) => e?.Year?.toString() === values?.Year?.value);
    }
    if (values?.Make) {
        filterConditions.push((e: any) => e?.Make === values?.Make?.value);
    }
    if (values?.Model) {
        filterConditions.push((e: any) => e?.Model === values?.Model?.value);
    }
    if (values?.Status) {
        filterConditions.push((e: any) => e?.Status === values?.Status?.value);
    }
    if (values?.MyBuyFigure) {
        filterConditions.push((e: any) => e?.UserID === user.UserID);
    }
    return filterConditions;
};
