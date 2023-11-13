import { get, post, postFile } from "../http";
import utils from "../../utils/Utils";
import { general, utils as strings } from "../../constants/strings/fa";
import { BASE_PATH, BASE_URL } from "../../constants";

class Entity {
    constructor() {
        this.errorMessage = "";
        this.errorCode = 0;
    }

    async handlePost(url, data = {}) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;
            const response = await post(url, data);

            return this.handleResponse(response);
        } catch (error) {
            console.log(error);

            if (error.message === "Network Error") {
                this.errorMessage = general.networkError;
            } else {
                this.errorMessage = error.message;
            }

            this.errorCode = 1000;

            return null;
        }
    }

    async handleGet(url, data) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;
            const response = await get(url, data);

            return this.handleResponse(response);
        } catch (error) {
            console.log(error);

            if (error.message === "Network Error") {
                this.errorMessage = general.networkError;
            } else {
                this.errorMessage = error.message;
            }

            this.errorCode = 1000;

            return null;
        }
    }

    async handlePostFile(url, data) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;

            const response = await postFile(url, data);

            return this.handleResponse(response);
        } catch (error) {
            console.log(error);

            if (error.message === "Network Error") {
                this.errorMessage = general.networkError;
            } else {
                this.errorMessage = error.message;
            }

            this.errorCode = 1000;

            return null;
        }
    }

    handleResponse(response) {
        try {
            if (!utils.isJsonString(response.data)) {
                this.errorMessage = strings.notValidJson;

                return null;
            }

            if (response.data._result !== "1") {
                this.errorMessage = response.data._error;
                this.errorCode = response.data._errorCode;
                this.handleError();

                return null;
            }

            return response.data;
        } catch (error) {
            console.log(error);
            this.errorMessage = error.message;
            this.errorCode = 1000;

            return null;
        }
    }

    handleError() {
        try {
            switch (this.errorCode) {
                case 1:
                case 2:
                    this.logout();

                    break;
                default:
                    return;
            }
        } catch (error) {}

        return;
    }

    logout() {
        try {
            utils.clearLS();

            post(`${BASE_URL}/u/users/logout`);
            window.location.href = `${BASE_PATH}/users/login`;
        } catch (error) {
            console.log(error);
        }
    }
}

export default Entity;
