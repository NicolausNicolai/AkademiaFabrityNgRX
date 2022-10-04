import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { ApplicationApiService } from '../services/application-api.service';
import { loadApplications, loadApplicationsSuccess } from './application.actions';



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
        map(a => loadApplicationsSuccess({data: a}))
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
