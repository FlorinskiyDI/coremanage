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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        HomeRoutes
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