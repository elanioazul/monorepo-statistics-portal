import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'admin',
        loadChildren: () =>
          import('@portal-map-nx-ngrx/admin').then((m) => m.AdminModule),
      },
      {
        path: 'tour',
        loadChildren: () =>
          import('@portal-map-nx-ngrx/visitor').then((m) => m.VisitorModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'tour' },
    ]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
