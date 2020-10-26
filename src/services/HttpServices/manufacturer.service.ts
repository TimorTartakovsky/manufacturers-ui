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

export interface IModelForMakeResponse {
    Count: number;
    Message: string;
    Results: Array<IModelForMakeResultsItem>;
    SearchCriteria: string;
}

export interface IMakeForManufacturerResponse {
    Count: number;
    Message: string;
    Results: Array<IMakeForManufacturerResultsItem>;
    SearchCriteria: string;
}

export interface IMakeForManufacturerResultsItem {
    Make_ID: number;
    Make_Name: string;
    Mfr_Name: string;
}

export interface IModelForMakeResultsItem {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;    
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

export interface IManufacturerService {
    getAllManufacturers: (p: number) => Promise<IManufacturerListItem[]>;
    getMakeForManufacturer: (m: string) => Promise<IModelForMakeResultsItem[]>;
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

    public async getAllManufacturerModelForMake(name: string): Promise<IModelForMakeResultsItem[]> {
        const response = await HttpService.get(`/getmodelsformake/${name}?format=json`) as {
            data: IModelForMakeResponse,
        };
        if (response && response.data) {
            return response.data.Results;
        } else {
            return [];
        }
    }

    public async getAllManufacturerMakes(name: string): Promise<IMakeForManufacturerResultsItem[]> {
        const response = await HttpService.get(`/GetMakeForManufacturer/${name}?format=json`) as {
            data: IMakeForManufacturerResponse,
        };
        if (response && response.data) {
            return response.data.Results;
        } else {
            return [];
        }
    }

}

export default new ManufacturerService();
