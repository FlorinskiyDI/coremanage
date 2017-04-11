// External
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// External > controls

// app > modules
import { SharedModule } from './shared/modules/shared.module';
import { AppRoutingModule } from './app-routes.module';
// app > routes
// app > components
import { AppComponent } from './app.component';
// app > services
// app > models
// app > constants
import { appConstant } from './shared/constants/app.constant';
// app > providers
import { requestOptionsProvider } from './shared/services/default-request-options.service';
// app > redux
import { StoreModule } from './redux/store/store.module';


@NgModule({
    imports: [
        BrowserModule,
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
        requestOptionsProvider   
    ]
})

export class AppModule {
    constructor() {        
    }
}