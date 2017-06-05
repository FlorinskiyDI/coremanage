// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { AboutRoutes } from './about-routes.module';
// app > components
import { AboutComponent } from './about.component';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutes
    ],

    declarations: [
        AboutComponent
    ],





})

export class AboutModule { }