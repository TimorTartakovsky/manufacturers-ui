import { IRootStore } from "../store";

export const getManufacturerDetailsMap = (state: IRootStore) => state.manufacturerDetails.details;
export const getManufacturerDetailsArray = (state: IRootStore) => {
    const detailsMap = state.manufacturerDetails.details || {};
    const array = Object.keys(detailsMap).map((k: string) => detailsMap[k]);
    return array;
};
