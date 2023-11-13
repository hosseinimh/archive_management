import utils from "./Utils";
import { NOTIFICATION_SUB_CATEGORIES } from "../constants";

const getSubCategoryText = (item, locale) => {
    if (item.subCategory === NOTIFICATION_SUB_CATEGORIES.LOGIN_SUCCEED) {
        const { date, time } = utils.getTimezoneDate(item.createdAt, locale);
        return item.subCategoryText
            .replace(":field1", date)
            .replace(":field2", time)
            .replace(":field3", item.messageFields);
    }
};

const notification = {
    getSubCategoryText,
};

export default notification;
