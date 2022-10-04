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

export const loadApplication = createAction(
  '[Application] Load Application',
  props<{ id: number }>()
);

export const newApplication = createAction(
  '[Application] New Application'
);

export const saveApplication = createAction(
  '[Application] Save Application',
  props<{ application: Application }>()
);

export const saveApplicationSuccess = createAction(
  '[Application] Save Application Success',
  props<{ application: Application }>()
);

export const saveApplicationFailure = createAction(
  '[Application] Save Application Failure',
  props<{ error: any }>()
);


