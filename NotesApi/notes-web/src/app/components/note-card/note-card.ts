import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css'
})
export class NoteCard {
  @Input() note: any;
  @Output() noteDeleted = new EventEmitter<string>();
  @Output() noteUpdated = new EventEmitter<void>();

  noteService = inject(NoteService);
  
  isEditing = false;
  editTitle = '';
  editContent = '';

  ngOnInit() {
    this.editTitle = this.note.title;
    this.editContent = this.note.content;
    // Ensure createdAt is a Date object
    if (typeof this.note.createdAt === 'string') {
      this.note.createdAt = new Date(this.note.createdAt);
    }
  }

  startEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editTitle = this.note.title;
    this.editContent = this.note.content;
  }

  saveEdit() {
    if (!this.editTitle.trim() && !this.editContent.trim()) return;

    const updatedNote = {
      ...this.note,
      title: this.editTitle,
      content: this.editContent
    };

    this.noteService.updateNote(this.note.id, updatedNote).subscribe({
      next: () => {
        this.note.title = this.editTitle;
        this.note.content = this.editContent;
        this.isEditing = false;
        this.noteUpdated.emit();
      },
      error: () => alert('Failed to update note')
    });
  }

  deleteNote() {
    if (confirm('Delete this note?')) {
      this.noteService.deleteNote(this.note.id).subscribe({
        next: () => this.noteDeleted.emit(this.note.id),
        error: () => alert('Failed to delete note')
      });
    }
  }
}
