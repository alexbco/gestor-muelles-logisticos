// app.module.ts

import { routing } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from "./pages/publico/login/login.component";
import { MaterialModule } from "./shared/material/material.module";
import { LoginGuard } from "./guards/login-guard.guard";

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, routing, FormsModule, HttpClientModule, BrowserAnimationsModule,MaterialModule],
  providers: [LoginGuard],
  bootstrap: [AppComponent],
  
})
export class AppModule {}