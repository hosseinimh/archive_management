import { BASE_PATH, BASE_URL } from "../../constants";
import Entity from "./Entity";

export class DocumentFile extends Entity {
    constructor() {
        super();
    }

    async getAll(documentId) {
        return await this.handlePost(
            `${BASE_URL}/u/document_files/${documentId}`
        );
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/u/document_files/show/${id}`);
    }

    async store(documentId, file, description) {
        let data = new FormData();
        data.append("file", file);
        data.append("description", description);
        return await this.handlePostFile(
            `${BASE_URL}/a/document_files/store/${documentId}`,
            data
        );
    }

    async update(id, description) {
        return await this.handlePost(
            `${BASE_URL}/a/document_files/update/${id}`,
            {
                description,
            }
        );
    }

    async delete(id) {
        return await this.handlePost(
            `${BASE_URL}/a/document_files/delete/${id}`
        );
    }

    download(id) {
        window.open(`${BASE_PATH}/document_files/download/${id}`);
    }

    getUploadScanEndpoint(documentId) {
        return `/a/document_files/store_via_scan/${documentId}`;
    }
}
