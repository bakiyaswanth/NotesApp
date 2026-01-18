import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note';
import { NoteCard } from '../note-card/note-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  noteService = inject(NoteService);
  router = inject(Router);

  userId = '';
  notes: any[] = [];
  title = '';
  content = '';

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) {
      this.router.navigate(['/login']); // Protect route
    } else {
      this.loadNotes();
    }
  }

  loadNotes() {
    this.noteService.getNotes(this.userId).subscribe({
      next: (data) => {
        // Convert date strings to Date objects for proper formatting
        this.notes = data.map(note => ({
          ...note,
          createdAt: note.createdAt ? new Date(note.createdAt) : new Date()
        }));
      },
      error: () => alert('Failed to load notes')
    });
  }

  addNote() {
    if (!this.title.trim() && !this.content.trim()) return;

    const newNote = {
      title: this.title.trim(),
      content: this.content.trim(),
      userId: this.userId
    };

    this.noteService.createNote(newNote).subscribe({
      next: () => {
        this.loadNotes();
        this.title = '';
        this.content = '';
      },
      error: () => alert('Failed to create note')
    });
  }

  handleNoteDeleted(noteId: string) {
    this.notes = this.notes.filter(n => n.id !== noteId);
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}