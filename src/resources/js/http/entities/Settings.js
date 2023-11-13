import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Settings extends Entity {
    constructor() {
        super();
    }

    async get() {
        return await this.handlePost(`${BASE_URL}/u/settings/show`);
    }

    async getCurrentYear() {
        return await this.handlePost(`${BASE_URL}/u/settings/current_year`);
    }

    async update(companyName, serialNo, registryBookNo, registerNo) {
        return await this.handlePost(`${BASE_URL}/a/settings/update`, {
            company_name: companyName,
            serial_no: serialNo,
            registry_book_no: registryBookNo,
            register_no: registerNo,
        });
    }
}
