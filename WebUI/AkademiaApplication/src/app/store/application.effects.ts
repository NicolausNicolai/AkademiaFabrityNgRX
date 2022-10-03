import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { ApplicationApiService } from '../services/application-api.service';
import { ApplicationActions } from './application.actiontypes';



@Injectable()
export class ApplicationEffects {
  
  constructor(private actions$: Actions, private api: ApplicationApiService) {}

  loadApplication$= createEffect(
    ()=> this.actions$
      .pipe(
        ofType(ApplicationActions.LoadAllApplications),
        concatMap(action => this.api.getApplications()),
        map(apps => ApplicationActions.LoadAllApplicationsSuccess({data: apps}))
      )
  );
}
