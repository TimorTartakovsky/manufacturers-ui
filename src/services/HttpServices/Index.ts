import axios, { AxiosInstance } from 'axios';

export interface IHttpService {
    get: (u: string) => Promise<any>;
    post: (u: string, d?: any) => Promise<any>;
    put: (u: string, d?: any) => Promise<any>;
    delete: (u: string, d?: any) => Promise<any>;
    patch: (u: string, d?: any) => Promise<any>;
}

class HttpService implements IHttpService {

    private http: AxiosInstance;

    constructor() {
        this.http = axios.create({ 
            baseURL: 'https://vpic.nhtsa.dot.gov/api/vehicles/',
        });
    }

    public async get(url: string):Promise<any> {
        return await this.http.get(url);
    }

    public async post(url: string, data?: any):Promise<any> {
        return await this.http.post(url, data);
    }

    public async patch(url: string, data?: any):Promise<any> {
        return await this.http.patch(url, data);
    }

    public async delete(url: string, data?: any):Promise<any> {
        return await this.http.delete(url, data);
    }

    public async put(url: string, data?: any):Promise<any> {
        return await this.http.delete(url, data);
    }
}

export default new HttpService();