import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private http = inject(HttpClient);

  // API URL - automatically detects environment
  // For local dev: uses localhost
  // For production: uses Netlify proxy to bypass CORS
  private apiUrl = (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? 'http://localhost:5145/api/app'  // Local development
    : '/api/app';  // Production - proxied through Netlify to bypass CORS

  checkUser(username: string): Observable<{ exists: boolean }> {
    console.log(`[NoteService] GET ${this.apiUrl}/check-user/${username}`);
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-user/${username}`);
  }

  login(data: any): Observable<any> {
    console.log(`[NoteService] POST to ${this.apiUrl}/login`, data);
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    console.log(`[NoteService] POST to ${this.apiUrl}/register`, data);
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getNotes(userId: string): Observable<any[]> {
    console.log(`[NoteService] GET from ${this.apiUrl}/notes/${userId}`);
    return this.http.get<any[]>(`${this.apiUrl}/notes/${userId}`);
  }

  createNote(note: any): Observable<any> {
    console.log(`[NoteService] POST to ${this.apiUrl}/notes`, note);
    return this.http.post(`${this.apiUrl}/notes`, note);
  }

  updateNote(noteId: string, note: any): Observable<any> {
    console.log(`[NoteService] PUT to ${this.apiUrl}/notes/${noteId}`, note);
    return this.http.put(`${this.apiUrl}/notes/${noteId}`, note);
  }

  deleteNote(noteId: string): Observable<any> {
    console.log(`[NoteService] DELETE to ${this.apiUrl}/notes/${noteId}`);
    return this.http.delete(`${this.apiUrl}/notes/${noteId}`);
  }
}
