import { Component, inject, ChangeDetectorRef } from '@angular/core';
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

        <!-- Step 1: Username -->
        <div class="form-group" *ngIf="step === 'username'">
          <input 
            [(ngModel)]="username" 
            placeholder="ENTER USERNAME" 
            (keyup.enter)="checkUsername()"
          />
        </div>
        <button *ngIf="step === 'username'" (click)="checkUsername()" class="btn-primary" [disabled]="loading">
          {{ loading ? 'CHECKING...' : 'CONTINUE' }}
        </button>

        <!-- Step 2: Password (existing user) -->
        <ng-container *ngIf="step === 'password'">
          <p class="welcome-text">WELCOME BACK, {{ username.toUpperCase() }}</p>
          <div class="form-group">
            <input 
              [(ngModel)]="password" 
              type="password" 
              placeholder="ENTER PASSWORD"
              (keyup.enter)="handleLogin()"
            />
          </div>
          <button (click)="handleLogin()" class="btn-primary" [disabled]="loading">
            {{ loading ? 'LOGGING IN...' : 'LOGIN' }}
          </button>
          <button (click)="goBack()" class="btn-secondary">BACK</button>
        </ng-container>

        <!-- Step 3: Registration (new user) -->
        <ng-container *ngIf="step === 'register'">
          <p class="welcome-text">CREATE ACCOUNT: {{ username.toUpperCase() }}</p>
          <div class="form-group">
            <input 
              [(ngModel)]="password" 
              type="password" 
              placeholder="CREATE PASSWORD"
              (keyup.enter)="handleRegister()"
            />
          </div>
          <button (click)="handleRegister()" class="btn-primary" [disabled]="loading">
            {{ loading ? 'CREATING...' : 'CREATE ACCOUNT' }}
          </button>
          <button (click)="goBack()" class="btn-secondary">BACK</button>
        </ng-container>
      </div>
    </div>
  `,
  styleUrl: './login.css'
})
export class LoginComponent {
  noteService = inject(NoteService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  step: 'username' | 'password' | 'register' = 'username';
  username = '';
  password = '';
  loading = false;

  checkUsername() {
    if (!this.username.trim() || this.loading) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.noteService.checkUser(this.username.trim()).subscribe({
      next: (res) => {
        this.loading = false;
        this.step = res.exists ? 'password' : 'register';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Check user error:', err);
        alert('Error checking username. Please try again.');
      }
    });
  }

  handleLogin() {
    if (!this.password.trim() || this.loading) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.noteService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('userId', res.userId);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.loading = false;
          this.cdr.detectChanges();
          alert('Invalid password');
        }
      });
  }

  handleRegister() {
    if (!this.password.trim() || this.loading) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.noteService.register({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('userId', res.userId);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.loading = false;
          this.cdr.detectChanges();
          alert('Registration failed: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
  }

  goBack() {
    this.step = 'username';
    this.password = '';
    this.cdr.detectChanges();
  }
}