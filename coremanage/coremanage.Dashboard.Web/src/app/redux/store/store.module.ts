import { NgModule } from '@angular/core';

// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
const reduxLogger  = require('redux-logger');
// import { provideReduxForms } from '@angular-redux/form';

import { IAppState, rootReducer } from './';
// import { RootEpics } from './root.epics';

@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule
  ],
//   providers: [RootEpics],
})

export class StoreModule {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    // rootEpics: RootEpics,
  ) {
    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    ngRedux.configureStore(
      rootReducer,
      {},
      [
        reduxLogger.createLogger(),
        // ...rootEpics.createEpics()
      ],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);

    // Enable syncing of Angular router state with our Redux store.
    ngReduxRouter.initialize();

    // Enable syncing of Angular form state with our Redux store.
    // provideReduxForms(store);
  }
}