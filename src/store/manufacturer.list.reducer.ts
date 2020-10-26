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
}

const initialManufacturerListState: IManufacturerListState = {
    manufacturers: null,
    isManufacturersLoadig: false,
    manufacturersLoadingError: null,
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