import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCurrencyPipe } from '../../../shared/pipes/custom-currency.pipe';


@Component({
  selector: 'app-admin-layout',
  // templateUrl: './admin-layout.component.html',
  // styleUrls: ['./admin-layout.component.css'],
  standalone : true,
  imports: [FormsModule , CommonModule , CustomCurrencyPipe , RouterModule , HeaderComponent , SidebarComponent],
   template: `
    <div class="admin-layout">
      <app-header></app-header>
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      margin-left: 260px;
      margin-top: 64px;
      padding: 2rem;
      min-height: calc(100vh - 64px);
      background-color: #f9fafb;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
        padding: 1rem;
      }
    }
  `]
})
export class AdminLayoutComponent {
  constructor() {
    console.log('AdminLayoutComponent initialized');
  }
}