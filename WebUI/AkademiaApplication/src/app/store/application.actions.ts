import { createAction, props } from '@ngrx/store';
import { Application } from '../models/application';

export const LoadAllApplications = createAction(
  '[Application] LoadAllApplications'
);

export const LoadAllApplicationsSuccess = createAction(
  '[Application] LoadAllApplicationsSuccess',
  props<{ data: Array<Application> }>()
);

export const LoadAllApplicationsFailure = createAction(
  '[Application] LoadAllApplicationsFailure',
  props<{ error: any }>()
);
