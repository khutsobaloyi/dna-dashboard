export interface Store {
    storeId: number;
    storeCode: string;
    storeName: string;
    storeNameFR: string; //france name
    storeDefault: boolean;
    storeDefaultPrice: boolean;
    storeIsActive: boolean;
    storeAddressLine1: string;
    storeAddressLine2: string;
    storeAddressLine3: string;
    storeAddressZipCode: string;
    storeAddressCity: string;
    storeAddressProvince: string;
    storeAddressSuburb: string;
    storeAddressCountryCode: string;
    storeType: number;
}