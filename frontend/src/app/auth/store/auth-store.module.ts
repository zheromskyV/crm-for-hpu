import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { authReducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [StoreModule.forFeature(StoreFeature.Auth, authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class AuthStoreModule {}
