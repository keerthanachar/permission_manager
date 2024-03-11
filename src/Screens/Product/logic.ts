export const vaidateFilterFields = (obj: any) => {
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
            return false;
        }
    }
    return true;
};

export const getDropDownData = (params: any) => {
    const LowYear = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.Year)
                ?.filter((year: any) => year !== undefined)
                ?.filter((year: any) => year !== null)
                ?.filter((year: any) => year !== "")
        )
    )
        .map((year: any, index: number) => ({
            label: JSON.stringify(year),
            value: index + 1
        }))
        .sort((a: any, b: any) => b.label - a.label);
    // const HighYear = Array.from(new Set(params?.map((product: any) => product?.ProductList?.Year).filter((year: any) => year !== undefined))).map(
    //     (year: any, index: number) => ({
    //         label: JSON.stringify(year),
    //         value: index + 1
    //     })
    // );
    const Make: any = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.Make)
                ?.filter((make: any) => make !== undefined)
                ?.filter((make: any) => make !== null)
                ?.filter((make: any) => make !== "")
        )
    )
        .map((make: any, index: number) => ({
            label: make,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));
    const Model = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.Model)
                ?.filter((model: any) => model !== undefined)
                ?.filter((model: any) => model !== null)
                ?.filter((model: any) => model !== "")
        )
    )
        .map((model: any, index: number) => ({
            label: model,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));

    const Trim = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.Trim)
                ?.filter((trim: any) => trim !== undefined)
                ?.filter((trim: any) => trim !== null)
                ?.filter((trim: any) => trim !== "")
        )
    )
        .map((trim: any, index: number) => ({
            label: trim,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));

    const Transmission = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.TransName)
                ?.filter((trans: any) => trans !== undefined)
                ?.filter((trans: any) => trans !== null)
                ?.filter((trans: any) => trans !== "")
        )
    )
        .map((trans: any, index: number) => ({
            label: trans,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));

    const Color = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.ExteriorColor)
                ?.filter((color: any) => color !== undefined)
                ?.filter((color: any) => color !== null)
                ?.filter((color: any) => color !== "")
        )
    )
        .map((color: any, index: number) => ({
            label: color,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));

    const Engine = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.Engine)
                ?.filter((engine: any) => engine !== undefined)
                ?.filter((engine: any) => engine !== null)
                ?.filter((engine: any) => engine !== "")
        )
    )
        .map((engine: any, index: number) => ({
            label: engine,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));

    const Price = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.RDPrice)
                ?.filter((price: any) => price !== undefined)
                ?.filter((price: any) => price !== null)
                ?.filter((price: any) => price !== "")
        )
    )
        .map((price: any, index: number) => ({
            label: price,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label - b.label);
    const Mileage = Array.from(
        new Set(
            params
                ?.map((product: any) => product?.ProductList?.OdometerReading)
                ?.filter((mileage: any) => mileage !== undefined)
                ?.filter((mileage: any) => mileage !== null)
                ?.filter((mileage: any) => mileage !== "")
        )
    )
        .map((mileage: any, index: number) => ({
            label: mileage,
            value: index + 1
        }))
        .sort((a: any, b: any) => a.label - b.label);
    return { LowYear, Make, Model, Trim, Transmission, Color, Engine, Price, Mileage };
};

export const getFilteredProductData = (values: any, InventoryList: any) => {
    let filteredProduct: any = InventoryList;
    if (values?.FreshListing?.value) {
        filteredProduct = filteredProduct?.filter((item: any) => {
            const today = new Date();
            const listedDate = new Date(item?.Dealers?.[0]?.ListedDate);

            if (values?.FreshListing?.value === 7) {
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                return listedDate > sevenDaysAgo && listedDate <= today;
            }
            if (values?.FreshListing?.value === 14) {
                const eightDaysAgo = new Date(today);
                eightDaysAgo.setDate(today.getDate() - 8);
                return listedDate <= eightDaysAgo;
            }
            return item;
        });
    }

    if (values?.LowYear && values?.HighYear) {
        const lowYearLabel = Number(values?.LowYear.label);
        const highYearLabel = Number(values?.HighYear.label);

        filteredProduct = filteredProduct?.filter((item: any) => {
            const carYear = item?.ProductList ? Number(item.ProductList.Year) : null;
            return carYear && carYear >= lowYearLabel && carYear <= highYearLabel;
        });
    }
    if (values?.LowYear) {
        const lowYearLabel = Number(values?.LowYear.label);

        filteredProduct = filteredProduct?.filter((item: any) => {
            return item.ProductList && Number(item.ProductList.Year) >= lowYearLabel;
        });
    }
    if (values?.HighYear) {
        const highYearLabel = Number(values?.HighYear.label);

        filteredProduct = filteredProduct?.filter((item: any) => {
            const carYear = Number(item?.ProductList?.Year);
            return carYear <= highYearLabel;
        });
    }
    if (values?.Make) {
        const makeLabel = values?.Make.label;

        filteredProduct = filteredProduct?.filter((item: any) => {
            return item.ProductList && item?.ProductList?.Make === makeLabel;
        });
    }
    if (values?.Model) {
        const modelLabel = values?.Model.label;

        filteredProduct = filteredProduct?.filter((item: any) => {
            return item.ProductList && item.ProductList.Model === modelLabel;
        });
    }

    if (values?.Trim) {
        const trimLabel = values?.Trim.label;

        filteredProduct = filteredProduct?.filter((item: any) => {
            return item.ProductList && item.ProductList.Trim === trimLabel;
        });
    }
    if (values?.Color) {
        const colorLabel = values?.Color.label;

        filteredProduct = filteredProduct?.filter((item: any) => {
            return item.ProductList && item.ProductList.ExteriorColor === colorLabel;
        });
    }
    if (values?.Engine) {
        const engineLabel = values?.Engine.label;

        filteredProduct = filteredProduct?.filter((item: any) => {
            return item.ProductList && item.ProductList.Engine === engineLabel;
        });
    }
    if (values?.Transmission) {
        const transmissionLabel = values?.Transmission.label;

        filteredProduct = filteredProduct?.filter((item: any) => {
            return item.ProductList && item.ProductList.TransName === transmissionLabel;
        });
    }
    if (values?.MinPrice && values?.MaxPrice) {
        const minPriceLabelWithoutDollar = parseFloat(values?.MinPrice.label.replace("$", ""));
        const maxPriceLabelWithoutDollar = parseFloat(values?.MaxPrice.label.replace("$", ""));

        filteredProduct = filteredProduct?.filter((item: any) => {
            const rdPriceWithoutDollar = parseFloat(item?.ProductList?.RDPrice.replace("$", "").replace(".00", ""));
            return rdPriceWithoutDollar >= minPriceLabelWithoutDollar && rdPriceWithoutDollar <= maxPriceLabelWithoutDollar;
        });
    }
    if (values?.MinPrice) {
        const minPriceLabelWithoutDollar = parseFloat(values?.MinPrice.label.replace("$", ""));

        filteredProduct = filteredProduct?.filter((item: any) => {
            const rdPriceWithoutDollar = parseFloat(item?.ProductList?.RDPrice.replace("$", "").replace(".00", ""));
            return rdPriceWithoutDollar >= minPriceLabelWithoutDollar;
        });
    }
    if (values?.MaxPrice) {
        const maxPriceLabelWithoutDollar = parseFloat(values?.MaxPrice.label.replace("$", ""));

        filteredProduct = filteredProduct?.filter((item: any) => {
            const rdPriceWithoutDollar = parseFloat(item?.ProductList?.RDPrice.replace("$", "").replace(".00", ""));
            return rdPriceWithoutDollar <= maxPriceLabelWithoutDollar;
        });
    }

    if (values?.MinMileage && values?.MaxMileage) {
        const minMileageLabel = values?.MinMileage.label.replace(/[^\d]/g, ""); // Remove non-digit characters
        const maxMileageLabel = values?.MaxMileage.label.replace(/[^\d]/g, "");

        filteredProduct = filteredProduct?.filter((item: any) => {
            const odometerReading = item?.ProductList?.OdometerReading.replace(/[^\d]/g, "");
            return odometerReading >= minMileageLabel && odometerReading <= maxMileageLabel;
        });
    }
    if (values?.MinMileage) {
        const minMileageLabel = values?.MinMileage.label.replace(/[^\d]/g, "");

        filteredProduct = filteredProduct?.filter((item: any) => {
            const odometerReading = item?.ProductList?.OdometerReading.replace(/[^\d]/g, "");
            return odometerReading >= minMileageLabel;
        });
    }

    if (values?.MaxMileage) {
        const maxMileageLabel = values?.MaxMileage.label.replace(/[^\d]/g, "");

        filteredProduct = filteredProduct?.filter((item: any) => {
            const odometerReading = item?.ProductList?.OdometerReading.replace(/[^\d]/g, "");
            return odometerReading <= maxMileageLabel;
        });
    }
    return filteredProduct;
};
