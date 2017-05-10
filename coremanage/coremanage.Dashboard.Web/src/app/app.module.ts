// external
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// app
import { SharedModule } from './shared/modules/shared.module';
import { AppRoutingModule } from './app-routes.module';
// app > components
import { AppComponent } from './app.component';
// app > providers
// import { requestOptionsProvider } from './shared/services/api/default-request-options.service';
// app > redux
import { StoreModule } from './redux/store/store.module';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpModule,
        SharedModule.forRoot(),        
        StoreModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [        
        // requestOptionsProvider
    ]
})

export class AppModule {
    constructor() {        
    }
}