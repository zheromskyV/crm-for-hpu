import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhonesState } from './phones.state';
import { StoreFeature } from '../../constants/store.enum';
import { Phone } from '../../models/phone';

const rootSelector = createFeatureSelector<PhonesState>(StoreFeature.Phones);

const getPhones = createSelector(rootSelector, (state: PhonesState): Phone[] => state.phones);

export const FromPhones = { getPhones };
