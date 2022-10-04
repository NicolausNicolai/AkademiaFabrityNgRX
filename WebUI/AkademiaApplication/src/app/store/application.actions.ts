import { createAction, props } from '@ngrx/store';
import { Application } from '../models/application';

export const loadApplications = createAction(
  '[Application] Load Applications'
);

export const loadApplicationsSuccess = createAction(
  '[Application] Load Applications Success',
  props<{ data: Array<Application> }>()
);

export const loadApplicationsFailure = createAction(
  '[Application] Load Applications Failure',
  props<{ error: any }>()
);
