import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ApplicationApiService } from '../services/application-api.service';
import { loadApplications, loadApplicationsFailure, loadApplicationsSuccess } from './application.actions';



@Injectable()
export class ApplicationEffects {
  constructor(private actions$: Actions,
    private api: ApplicationApiService) {}


  loadApplications$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(loadApplications),
        tap(d => console.log("In effect", d)),
        mergeMap(a => this.api.getApplications()),
        map(a => loadApplicationsSuccess({data: a})),
        catchError(error => of(loadApplicationsFailure({ error })))
      )
  )

    // loadApplications$ = createEffect(
    //     () => this.actions$
    //         .pipe(
    //             ofType(CourseActions.loadAllCourses),
    //             concatMap(action =>
    //                 this.coursesHttpService.findAllCourses()),
    //             map(courses => allCoursesLoaded({courses}))

    //         )
    // );

}
