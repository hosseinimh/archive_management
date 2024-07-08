import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Document extends Entity {
    constructor() {
        super();
    }

    async getPaginate(
        documentYear,
        documentNo,
        documentDate,
        paymentNo,
        paymentDate,
        owner,
        _pn = 1,
        _pi = PAGE_ITEMS
    ) {
        return await this.handlePost(`${BASE_URL}/u/documents`, {
            document_year: documentYear,
            document_no: documentNo,
            document_date: documentDate,
            payment_no: paymentNo,
            payment_date: paymentDate,
            owner,
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/u/documents/show/${id}`);
    }

    async getAddProps(year) {
        return await this.handlePost(`${BASE_URL}/a/documents/add_props`, {
            year,
        });
    }

    async store(
        documentYear,
        documentNo,
        documentDate,
        paymentNo,
        paymentDate,
        owner,
        description
    ) {
        return await this.handlePost(`${BASE_URL}/a/documents/store`, {
            document_year: documentYear,
            document_no: documentNo,
            document_date: documentDate,
            payment_no: paymentNo,
            payment_date: paymentDate,
            owner,
            description,
        });
    }

    async update(
        id,
        documentYear,
        documentNo,
        documentDate,
        paymentNo,
        paymentDate,
        owner,
        description
    ) {
        return await this.handlePost(`${BASE_URL}/a/documents/update/${id}`, {
            document_year: documentYear,
            document_no: documentNo,
            document_date: documentDate,
            payment_no: paymentNo,
            payment_date: paymentDate,
            owner,
            description,
        });
    }
}
