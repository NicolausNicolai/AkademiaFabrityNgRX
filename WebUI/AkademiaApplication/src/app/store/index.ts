import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApplication from './application.reducer';


export interface AppState {

  [fromApplication.applicationFeatureKey]: fromApplication.ApplicationState;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromApplication.applicationFeatureKey]: fromApplication.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
