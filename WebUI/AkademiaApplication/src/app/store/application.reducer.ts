import { Action, createReducer, on } from '@ngrx/store';
import { Application } from '../models/application';
import { ApplicationActions } from './application.actiontypes';


export const applicationFeatureKey = 'application';

export interface ApplicationState {
  isLoading: boolean,
  applications: Array<Application>
}

export const initialState: ApplicationState = {
  isLoading: false,
  applications: []
};

export const reducer = createReducer(
  initialState,
  on(ApplicationActions.LoadAllApplications, (state, action) => 
      state = { ...state, isLoading: true}
  )
);


// export const reducer = createReducer(
//   initialState,
//   on (ApplicationActions.LoadAllApplicationsSuccess, (state, action) => 
//     state = {...state, applications: action.data } 
//   ),
// );
