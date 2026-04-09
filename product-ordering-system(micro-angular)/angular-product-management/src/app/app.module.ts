import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';

// Import Core and Shared modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  imports: [
    // Angular Core Modules
    BrowserModule,
    HttpClientModule,

    // Application Modules
    CoreModule,
    SharedModule,

    // Routing
    AppRoutingModule,

    // ✅ Import standalone AppComponent
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}