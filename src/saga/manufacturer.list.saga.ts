import {  takeLatest, put, fork, call } from 'redux-saga/effects';
import { IActionPayload } from '../actions';
import {
    getFetchAllManufacturersFail,
    getFetchAllManufacturersStart, getFetchAllManufacturersSuccess, MANUFACTURER_ACTIONS_MAP
} from '../actions/manufacturer.list.actions';
import ManufacturerService from '../services/HttpServices/manufacturer.service';

function* fetchAllManufacturersWORK(action: IActionPayload) {
    try {
        const { page } = action.payload || {};
        yield put(getFetchAllManufacturersStart());
        const allManufacturers = yield call(ManufacturerService.getAllManufacturers, page);
        yield put(getFetchAllManufacturersSuccess(allManufacturers))
    } catch (e) {
        yield put(getFetchAllManufacturersFail(e));
    }
}

export function* watchFetchAllManufacturers() {
    yield takeLatest(MANUFACTURER_ACTIONS_MAP.FETCH_ALL_MANUFACTURERS_REQUEST, fetchAllManufacturersWORK);
}

const allManufacturersListSagas = [
    fork(watchFetchAllManufacturers),
]

export default allManufacturersListSagas;