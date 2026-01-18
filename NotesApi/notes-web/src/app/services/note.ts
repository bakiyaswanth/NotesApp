import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private http = inject(HttpClient);

  // API URL - uses relative path when deployed with nginx proxy
  // For local dev: 'http://localhost:5145/api/app'
  // For Docker deployment, nginx proxies /api to backend
  private apiUrl = 'http://localhost:5145/api/app';

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getNotes(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notes/${userId}`);
  }

  createNote(note: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notes`, note);
  }

  updateNote(noteId: string, note: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/notes/${noteId}`, note);
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notes/${noteId}`);
  }
}