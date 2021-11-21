import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { coreReducer } from './core.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './core.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [StoreModule.forFeature(StoreFeature.Core, coreReducer), EffectsModule.forFeature([CoreEffects])],
})
export class CoreStoreModule {}
