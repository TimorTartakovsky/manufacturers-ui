import { IManufacturerListItem } from '../../store/manufacturer.list.reducer';
import HttpService from './Index';

export interface IManufacturersResultVehicleTypesItem {
    Name: string;
    IsPrimary: boolean;
}

export interface IManufacturersResultItem {
    Country: string;
    Mfr_CommonName: string;
    Mfr_ID: number;
    Mfr_Name: string;
    VehicleTypes: IManufacturersResultVehicleTypesItem[];
}

export interface IManufacturersResponse {
    Count: number;
    Message: string;
    Results: Array<IManufacturersResultItem>;
    SearchCriteria: string;
}

const manufacturerTransformerData = (manufacturers: IManufacturersResultItem[])
:IManufacturerListItem[] => {
    return manufacturers.map((m: IManufacturersResultItem) => {
        return {
            id: m.Mfr_ID,
            country: m.Country,
            name: m.Mfr_CommonName,
        }
    });
}

class ManufacturerService {;

    public async getAllManufacturers(page: number = 1): Promise<IManufacturerListItem[]> {
        const response = await HttpService.get(`/getallmanufacturers?format=json&page=${page}`) as {
            data: IManufacturersResponse,
        };
        if (response && response.data) {
            return manufacturerTransformerData(response.data.Results);
        } else {
            return [];
        }
    }

}

export default new ManufacturerService();
