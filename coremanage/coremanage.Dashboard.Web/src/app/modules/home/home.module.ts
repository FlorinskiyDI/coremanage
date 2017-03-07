import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { HomeRoutes } from './home-routes.module';
import { HomeComponent } from './home.component';

import { ValueService } from '../../shared/services/api/entities/value.service';

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
        ValueService
    ]

})

export class HomeModule { }