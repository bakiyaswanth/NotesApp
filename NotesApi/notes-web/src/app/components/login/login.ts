import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h1 class="brand">NOTES_APP</h1>
        <p class="subtitle">MINIMALIST WORKSPACE</p>

        <div class="form-group">
          <input [(ngModel)]="username" placeholder="USERNAME" />
        </div>
        <div class="form-group">
          <input [(ngModel)]="password" type="password" placeholder="PASSWORD" />
        </div>

        <button (click)="handleLogin()" class="btn-primary">AUTHENTICATE</button>
        <button (click)="handleRegister()" class="btn-secondary">CREATE ACCOUNT</button>
      </div>
    </div>
  `,
  styleUrl: './login.css'
})
export class LoginComponent {
  noteService = inject(NoteService);
  router = inject(Router);

  username = '';
  password = '';

  handleLogin() {
    this.noteService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('userId', res.userId); // Save ID
          this.router.navigate(['/dashboard']);
        },
        error: () => alert('Invalid Credentials')
      });
  }

  handleRegister() {
    this.noteService.register({ username: this.username, password: this.password })
      .subscribe({
        next: () => alert('Account created. Please login.'),
        error: (err) => {
          console.error('Registration error:', err);
          alert('Registration failed: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
  }
}