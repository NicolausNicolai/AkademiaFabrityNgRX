import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from './application.reducer';
import * as fromApplication from './application.reducer';

export const selectApplicationState =
    createFeatureSelector<ApplicationState>(fromApplication.applicationFeatureKey);

    export const selectIsLoading = createSelector(
        selectApplicationState,
        appState => appState.isLoading
    );

    export const selectApplications = createSelector(
        selectApplicationState,
        appState => appState.applications
    );
        