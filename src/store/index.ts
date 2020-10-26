import { IManufacturerDetailsState } from './manufacturer.detail.reducer';
import { IManufacturerListState } from './manufacturer.list.reducer';

export interface IRootStore {
    manufacturersList: IManufacturerListState,
    manufacturerDetails: IManufacturerDetailsState,
}