import { IActionPayload } from '../actions';
import { MANUFACTURER_ACTIONS_MAP } from '../actions/manufacturer.list.actions';

export interface IManufacturerListItem {
    id: number;
    name: string;
    country: string;
}

export interface IManufacturerListState {
    manufacturers: Array<IManufacturerListItem> | null;
    isManufacturersLoadig: boolean;
    manufacturersLoadingError: Error | null,
    currentPage: number,
}

const initialManufacturerListState: IManufacturerListState = {
    manufacturers: null,
    isManufacturersLoadig: false,
    manufacturersLoadingError: null,
    currentPage: 0,
}

const manufacturerListReducer = ( state = initialManufacturerListState, action: IActionPayload ) => {
    switch ( action.type ) {
        case MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_START:
            return {
                ...state,
                isManufacturersLoadig: true,
            }
        case MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_SUCESS:
            return {
                ...state,
                isManufacturersLoadig: false,
                manufacturers: action.payload!.manufacturers || [],
                manufacturersLoadingError: null,
                currentPage: action.payload!.currentPage || 1,
            }
        case MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_FAIL:
            return {
                ...state,
                isManufacturersLoadig: false,
                manufacturers: [],
                manufacturersLoadingError: action.payload!.error,
            }
        default: return state;
    }
}

export default manufacturerListReducer;