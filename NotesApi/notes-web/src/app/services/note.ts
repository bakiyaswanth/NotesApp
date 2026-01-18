import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private http = inject(HttpClient);

  // API URL - automatically detects environment
  // For local dev: uses localhost
  // For production: uses Netlify proxy to bypass CORS
  private apiUrl = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? 'http://localhost:5145/api/app'  // Local development
    : '/api/app';  // Production - proxied through Netlify to bypass CORS

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
