import { IActionPayload, IActionsMap } from ".";
import { IManufacturerListItem } from "../store/manufacturer.list.reducer";

export const MANUFACTURER_ACTIONS_MAP: IActionsMap = {
    FETCH_ALL_MANUFACTURERS_REQUEST: 'FETCH_ALL_MANUFACTURERS_REQUEST',
    FETCH_ALL_MANUFACTURERS_START: 'FETCH_ALL_MANUFACTURERS_START',
    FETCH_ALL_MANUFACTURERS_SUCESS: 'FETCH_ALL_MANUFACTURERS_SUCESS',
    FETCH_ALL_MANUFACTURERS_FAIL: 'FETCH_ALL_MANUFACTURERS_FAIL',
}

export const getFetchAllManufacturers = (page: number): IActionPayload => {
    return {
        type: MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_REQUEST,
        payload: { page }
    }
}

export const getFetchAllManufacturersStart = (): IActionPayload => {
    return {
        type: MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_START,
    }
}

export const getFetchAllManufacturersSuccess = (manufacturers: Array<IManufacturerListItem>)
: IActionPayload => {
    return {
        type: MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_SUCESS,
        payload: { manufacturers }
    }
}

export const getFetchAllManufacturersFail = (error: Error): IActionPayload => {
    return {
        type: MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_FAIL,
        payload: { error }
    }
}