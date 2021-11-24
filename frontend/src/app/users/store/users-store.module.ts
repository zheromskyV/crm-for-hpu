import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [EffectsModule.forFeature([UsersEffects])],
})
export class UsersStoreModule {}
