import { Action, createReducer, on } from '@ngrx/store';
import { Application } from '../models/application';
import { loadApplications, loadApplicationsFailure, loadApplicationsSuccess } from './application.actions';


export const applicationFeatureKey = 'application';

export interface ApplicationState {
  isLoading: boolean;
  applicationsLoaded: boolean;
  applications: Array<Application>;
}

export const initialState: ApplicationState = {
  isLoading: false,
  applicationsLoaded: false,
  applications: []
};

export const reducer = createReducer(
  initialState,
  on (loadApplications, (state, action) => {
    console.log("W Reducerze", action);
    return {...state, isLoading: true }
  }),
  on(loadApplicationsSuccess, (state, action) => {
    return {...state, isLoading: false, applications: action.data, applicationsLoaded: true}
    }
  ),
  on(loadApplicationsFailure, (state, action) => {
    return {...state, isLoading: false, applicationsLoaded: false}
    }
  )
);
