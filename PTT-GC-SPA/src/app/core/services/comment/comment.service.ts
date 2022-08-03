import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Comment } from '@models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  LogComment(id , comment): Observable<Comment> {
    return this.http.put<Comment>(this.baseUrl + 'LogComment/' + id, comment);
  }
}
