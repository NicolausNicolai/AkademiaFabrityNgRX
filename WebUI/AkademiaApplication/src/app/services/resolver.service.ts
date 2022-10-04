import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { AppState } from '../store';
import { loadApplications } from '../store/application.actions';
import { selectApplicationsLoaded } from '../store/application.selectors';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any>{

  loading = false;

  constructor(private store: Store<AppState>) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {


    return this.store
    .pipe(
        select(selectApplicationsLoaded),
        tap(applicationsLoaded => {
            if (!this.loading && !applicationsLoaded) {
              this.loading = true;
              this.store.dispatch(loadApplications());
            }
        }),
        filter(applicationsLoaded => applicationsLoaded),
        first(),
        finalize(() => this.loading = false)
    );
  }
}
