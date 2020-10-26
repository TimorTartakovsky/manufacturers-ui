import {  takeLatest, put, fork, call, select } from 'redux-saga/effects';
import { IActionPayload } from '../actions';
import {
    getFetchAllManufacturersFail, getFetchAllManufacturersStart, getFetchAllManufacturersSuccess, 
    MANUFACTURER_ACTIONS_MAP
} from '../actions/manufacturer.list.actions';
import { getManufacturerCurrentPage, getManufacturerListArray } from '../selectors/manufacturer.list.selector';
import ManufacturerService from '../services/HttpServices/manufacturer.service';

function* fetchAllManufacturersWORK(action: IActionPayload) {
    try {
        const { page } = action.payload || {};
        const currentPage = yield select(getManufacturerCurrentPage);
        if (page === currentPage) { return; }
        yield put(getFetchAllManufacturersStart());
        const allManufacturers = yield call(ManufacturerService.getAllManufacturers, page);
        if (page < 2) {
            yield put(getFetchAllManufacturersSuccess(allManufacturers, page));
        } else {
            const manufacturers = yield select(getManufacturerListArray) || [];
            const mergedManufacturers = [...manufacturers, ...allManufacturers]
            yield put(getFetchAllManufacturersSuccess(mergedManufacturers, page))
        }
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