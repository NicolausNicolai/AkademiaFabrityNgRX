import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '.';
import { Application } from '../models/application';
import { loadApplication, loadApplications, loadApplicationsFailure, loadApplicationsSuccess, newApplication, saveApplication, saveApplicationSuccess } from './application.actions';


export const applicationFeatureKey = 'application';

export interface ApplicationState {
  isLoading: boolean;
  applicationsLoaded: boolean;
  currentlyEditedApplication: Application | undefined;
  applications: Array<Application>;
}

export const initialState: ApplicationState = {
  isLoading: false,
  applicationsLoaded: false,
  currentlyEditedApplication: undefined,
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
  ),
  on(loadApplication, (state, action) => {
    return {...state, currentlyEditedApplication: state.applications.find(a => a.id == action.id)}
    }
  ),
  on(newApplication, (state, action) => {
    return {...state, currentlyEditedApplication: undefined}
    }
  ),

  on(saveApplication, (state, action) => {
      console.log("W reducerze save changes", action.application);
      return {...state, isLoading: true}
    }
  ),
  on(saveApplicationSuccess, (state, action) => {
    console.log("W reducerze save changes success", action.application);
    return {...state, applications: [...state.applications, action.application], currentlyEditedApplication: action.application, isLoading: false}
  }
)


);
