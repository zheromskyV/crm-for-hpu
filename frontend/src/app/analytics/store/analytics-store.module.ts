import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { analyticsReducer } from './analytics.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AnalyticsEffects } from './analytics.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeature.Analytics, analyticsReducer),
    EffectsModule.forFeature([AnalyticsEffects]),
  ],
})
export class AnalyticsStoreModule {}
