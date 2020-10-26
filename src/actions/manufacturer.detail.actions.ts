import { IActionPayload, IActionsMap } from ".";
import { IManufacturerDetailsItem } from "../store/manufacturer.detail.reducer";
// import { IManufacturerListItem } from "../store/manufacturer.list.reducer";

export const MANUFACTURER_DETAIL_ACTIONS_MAP: IActionsMap = {
    FETCH_MANUFACTURERS_DETAILS_BY_NAME_REQUEST: 'FETCH_MANUFACTURERS_DETAILS_BY_NAME_REQUEST',
    FETCH_MANUFACTURERS_DETAILS_BY_NAME_START: 'FETCH_MANUFACTURERS_DETAILS_BY_NAME_START',
    FETCH_MANUFACTURERS_DETAILS_BY_NAME_SUCCESS: 'FETCH_MANUFACTURERS_DETAILS_BY_NAME_SUCCESS',
    FETCH_MANUFACTURERS_DETAILS_BY_NAME_FAIL: 'FETCH_MANUFACTURERS_DETAILS_BY_NAME_FAIL',
}

export const getManufacturerDetailsByName = (name: string): IActionPayload => {
    return {
        type: MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_REQUEST,
        payload: { name: name }
    }
}

export const getManufacturerDetailsByNameStart = (): IActionPayload => {
    return {
        type: MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_START,
    }
}

export const getManufacturerDetailsByNameSuccess = (details: {[k: string]: IManufacturerDetailsItem}): IActionPayload => {
    return {
        type: MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_SUCCESS,
        payload: { details }
    }
}

export const getManufacturerDetailsByNameFail = (error: Error): IActionPayload => {
    return {
        type: MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_FAIL,
        payload: { error }
    }
}

