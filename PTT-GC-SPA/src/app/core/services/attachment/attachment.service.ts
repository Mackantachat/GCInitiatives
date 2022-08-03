import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AttachmentList } from '@models/AttachmentList';

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {

    baseUrl = environment.apiUrl + 'initiative/';

    constructor(private http: HttpClient) { }

    GetAttachment(id) {
        return this.http.get<AttachmentList>(this.baseUrl + 'Attachment/' + id);
    }

    GetCategoryAttachment(id, categoryId, categoryType) {
        let data: {
            categoryId: number;
            categoryType: string
        } = {
            categoryId: categoryId,
            categoryType: categoryType
        }
        return this.http.post<AttachmentList>(this.baseUrl + 'Attachment/Category/' + id, data);
    }

    GetDownloadAttachment(id, fileName) {
        fileName = encodeURIComponent(fileName); //escape(fileName);
        return this.http.get(this.baseUrl + 'DownloadBlob/' + id + '/' + fileName, { responseType: 'blob' });
    }

    GetDownloadTrainingMaterial(fileName) {
        fileName = encodeURIComponent(fileName);
        return this.http.get(this.baseUrl + 'DownloadTrainingMaterial/' + fileName, { responseType: 'blob' });
    }

    DeleteAttachment(id) {
        return this.http.delete(this.baseUrl + 'Attachment/' + id);
    }
}
