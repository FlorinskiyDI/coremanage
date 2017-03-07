import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from './shared/modules/shared.module';
// import { LoginModule } from './modules/login/login.module';

import { requestOptionsProvider } from './shared/services/default-request-options.service';

import { appConstant } from './shared/constants/app.constant';
import { AppRoutingModule } from './app-routes.module';

import { AppComponent } from './app.component';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { IAppState, ISession, rootReducer } from './redux/store';
// import { IRootState } from './redux/store/rootState';
// import RootReducer from './redux/store/rootReducer';
const createLogger = require('redux-logger');

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        SharedModule.forRoot(),
        // LoginModule,
        NgReduxModule,
        NgReduxRouterModule,
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
    constructor(
        private ngRedux: NgRedux<any>,
        private ngReduxRouter: NgReduxRouter,
        private devTool: DevToolsExtension
    ) {
        ngRedux.configureStore(
            rootReducer,
            {},
            [ createLogger() ],
            [ devTool.isEnabled() ? devTool.enhancer() : f => f ]
        );
        ngReduxRouter.initialize();
    }
}