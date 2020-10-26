import { IRootStore } from "../store";


export const getManufacturerListArray = (state: IRootStore) => state.manufacturersList.manufacturers;
export const getManufacturerIsLoading = (state: IRootStore) => state.manufacturersList.isManufacturersLoadig;  
export const getManufacturerError = (state: IRootStore) => state.manufacturersList.manufacturersLoadingError; 
export const getManufacturerCurrentPage  = (state: IRootStore) => state.manufacturersList.currentPage;