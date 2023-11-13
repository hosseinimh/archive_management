import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Dashboard extends Entity {
    constructor() {
        super();
    }

    async getReview() {
        return await this.handlePost(`${BASE_URL}/u/dashboard`);
    }
}
