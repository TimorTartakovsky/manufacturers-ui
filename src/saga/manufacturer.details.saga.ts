import {  takeLatest, put, fork, call } from 'redux-saga/effects';
import { IActionPayload } from '../actions';
import {
    getManufacturerDetailsByNameFail, getManufacturerDetailsByNameStart, getManufacturerDetailsByNameSuccess, 
    MANUFACTURER_DETAIL_ACTIONS_MAP
} from '../actions/manufacturer.detail.actions';
import { IDetailsItem } from '../components/ManufacturerDetails';
import ManufacturerService, { IMakeForManufacturerResultsItem, IModelForMakeResultsItem } from '../services/HttpServices/manufacturer.service';


function* getManufacturerDetailsByNameWORK(action: IActionPayload) {
    try {
        const { name } = action.payload || {};
        yield put(getManufacturerDetailsByNameStart());
        const aggregatedDataMap: IDetailsItem = {};
        const models = yield call(ManufacturerService.getAllManufacturerModelForMake, name);
        const makes = yield call(ManufacturerService.getAllManufacturerMakes, name);

        makes.forEach((m: IMakeForManufacturerResultsItem) => {
            const key = `${m.Make_Name}${m.Make_ID}`;
            if (!!aggregatedDataMap[key]) {
                aggregatedDataMap[key].manufaturers = `${aggregatedDataMap[key].manufaturers}, ${m.Mfr_Name}`;
            } else {
                aggregatedDataMap[key] = {
                    makeNames: m.Make_Name,
                    manufaturers: m.Mfr_Name,
                    mopdelNames: '',
                }
            }
        });
        models.forEach((m: IModelForMakeResultsItem) => {
            const key = `${m.Make_Name}${m.Make_ID}`;
            if (!!aggregatedDataMap[key]) {
                aggregatedDataMap[key].mopdelNames = `${aggregatedDataMap[key].mopdelNames}, ${m.Model_Name}`;
            } else {
                aggregatedDataMap[key] = {
                    makeNames: m.Make_Name,
                    manufaturers: '',
                    mopdelNames: m.Model_Name,
                }
            }
        });
        yield put(getManufacturerDetailsByNameSuccess(aggregatedDataMap));
    } catch(e) {
        yield put(getManufacturerDetailsByNameFail(e));
    }
}

export function* watchManufacturerDetailsByName() {
    yield takeLatest(
        MANUFACTURER_DETAIL_ACTIONS_MAP.FETCH_MANUFACTURERS_DETAILS_BY_NAME_REQUEST,
        getManufacturerDetailsByNameWORK,
    );
}


const allManufacturersDetailsSagas = [
    fork(watchManufacturerDetailsByName),
]

export default allManufacturersDetailsSagas;