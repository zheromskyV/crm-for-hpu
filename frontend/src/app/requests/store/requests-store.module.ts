import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { requestsReducer } from './requests.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RequestsEffects } from './requests.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeature.Requests, requestsReducer),
    EffectsModule.forFeature([RequestsEffects]),
  ],
})
export class RequestsStoreModule {}
