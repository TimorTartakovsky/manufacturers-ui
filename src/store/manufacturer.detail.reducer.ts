import { IActionPayload } from '../actions';
import { MANUFACTURER_DETAIL_ACTIONS_MAP } from '../actions/manufacturer.detail.actions';

export interface IManufacturerDetailsItem {
    makeNames: string;
    mopdelNames: string;
    manufaturers: string;
}

export interface IManufacturerDetailsState {
  details: {[k: string]: IManufacturerDetailsItem} | null;
}

const initialManufacturerListState: IManufacturerDetailsState = {
    details: {},
}

const manufacturerDetailsReducer = ( state = initialManufacturerListState, action: IActionPayload ) => {
    switch ( action.type ) {
        case MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_START:
            return state;
        case MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_SUCCESS:
            return {
                ...state,
                details: action.payload!.details || [],
            }
        case MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_FAIL:
            return {
                ...state,
                details: [],
            }
        default: return state;
    }
}

export default manufacturerDetailsReducer;