import serverConfig from "../../../server-config.json";
import { MESSAGE_TYPES } from "./messageTypes";
import { MESSAGE_CODES } from "./messageCodes";
import { MODAL_RESULT } from "./modalResult";
import { UPLOADED_FILE } from "./UploadedFile";
import { USER_ROLES } from "./userRoles";
import { NOTIFICATION_CATEGORIES } from "./notificationCategories";
import { NOTIFICATION_SUB_CATEGORIES } from "./notificationSubCategories";
import { YEARS } from "./years";
import { YEAR_COLORS } from "./yearColors";
import {
    BASE_PATH,
    ASSETS_PATH,
    IMAGES_PATH,
    JS_PATH,
    STORAGE_PATH,
    PAGE_ITEMS,
    THEMES,
    themes,
} from "./theme";

const BASE_URL = serverConfig.baseUrl;
const DWT_KEY = serverConfig.dwtKey;

export {
    BASE_URL,
    BASE_PATH,
    ASSETS_PATH,
    IMAGES_PATH,
    JS_PATH,
    STORAGE_PATH,
    PAGE_ITEMS,
    DWT_KEY,
    THEMES,
    themes,
    MESSAGE_TYPES,
    MESSAGE_CODES,
    MODAL_RESULT,
    UPLOADED_FILE,
    USER_ROLES,
    NOTIFICATION_CATEGORIES,
    NOTIFICATION_SUB_CATEGORIES,
    YEARS,
    YEAR_COLORS,
};
