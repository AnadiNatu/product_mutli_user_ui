import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy, AfterViewInit, DoCheck } from "@angular/core";
import { Router, NavigationStart, NavigationEnd, NavigationError, RouterModule } from "@angular/router";
import { filter } from "rxjs";

// @Component({
//    selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule , CommonModule], // ✅ required for <router-outlet>
//   templateUrl: './app.component.html'
// })
// export class AppComponent implements OnInit, OnDestroy, AfterViewInit, DoCheck {
//   title = 'OrderFlow Pro - Angular 17';
//   isLoading = false;

//   constructor(private router: Router) {
//     console.log('🔧 AppComponent: constructor() - Root component instantiated');
//   }

//   /*
//    - OnInit - Component initialization
//    - Perfect place for subscriptions and initial setup*/
//   ngOnInit(): void {
//     console.log('✅ AppComponent: ngOnInit() - Component initialized');
    
//     // Subscribe to router events for loading indicator
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationStart) {
//         this.isLoading = true;
//         console.log('🔄 Navigation started:', event.url);
//       }
      
//       if (event instanceof NavigationEnd) {
//         this.isLoading = false;
//         console.log('✅ Navigation completed:', event.url);
//       }
      
//       if (event instanceof NavigationError) {
//         this.isLoading = false;
//         console.error('❌ Navigation error:', event.error);
//       }
//     });

//     // Log current route
//     this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe((event: any) => {
//         console.log('📍 Current route:', event.url);
//       });
//   }

//   /**
//    * DoCheck - Custom change detection
//    * Called during every change detection cycle
//    * Use sparingly - performance intensive
//    */
//   ngDoCheck(): void {
//     // Commented out to avoid console spam
//     // console.log('🔍 AppComponent: ngDoCheck() - Change detection cycle');
//   }

//   /**
//    * AfterViewInit - After view initialization
//    * Safe to access view children
//    */
//   ngAfterViewInit(): void {
//     console.log('👁️ AppComponent: ngAfterViewInit() - View initialized');
//   }

//   /**
//    * OnDestroy - Cleanup before component destruction
//    * IMPORTANT: Unsubscribe from observables to prevent memory leaks
//    */
//   ngOnDestroy(): void {
//     console.log('🗑️ AppComponent: ngOnDestroy() - Component destroyed');
//     // In this case, router subscriptions are automatically cleaned up
//     // But in general, always unsubscribe from custom subscriptions here
//   }
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="app-container">
      @if (isLoading) {
        <div class="loading-overlay">
          <div class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-muted">Loading...</p>
          </div>
        </div>
      }
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'OrderFlow Pro - Angular 17';
  isLoading = false;

  constructor(private router: Router) {
    console.log('🔧 AppComponent: constructor() - Root component instantiated');
  }

  ngOnInit(): void {
    console.log('✅ AppComponent: ngOnInit() - Component initialized');
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        console.log('🔄 Navigation started:', event.url);
      }
      
      if (event instanceof NavigationEnd) {
        this.isLoading = false;
        console.log('✅ Navigation completed:', event.url);
      }
      
      if (event instanceof NavigationError) {
        this.isLoading = false;
        console.error('❌ Navigation error:', event.error);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('🗑️ AppComponent: ngOnDestroy() - Component destroyed');
  }
}