// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// app
import { HomeRoutes } from './home-routes.module';
// app > components
import { HomeComponent } from './home.component';
// app > services
import { ValueApiService } from '../../common/services/api/entities/value.api.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        HomeRoutes,
        SlimLoadingBarModule.forRoot(),        
        NgProgressModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        ValueApiService
    ]

})

export class HomeModule { }