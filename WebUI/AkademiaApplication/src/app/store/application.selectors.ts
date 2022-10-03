import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from './application.reducer';
import * as fromApplication from './application.reducer';

export const selectApplicationState =
    createFeatureSelector<ApplicationState>(fromApplication.applicationFeatureKey);

export const isLoading = createSelector(
    selectApplicationState,
    appState =>  appState.isLoading
);