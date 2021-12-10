import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { phonesReducer } from './phones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PhonesEffects } from './phones.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeature.Phones, phonesReducer),
    EffectsModule.forFeature([PhonesEffects]),
  ],
})
export class PhonesStoreModule {}
