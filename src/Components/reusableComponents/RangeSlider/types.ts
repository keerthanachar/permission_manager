export interface PriceRangeSliderProps {
    value?: number[];
    onChange: (value: any) => void;
    min?: number;
    max?: number;
    scale?: (value: number) => number;
}
