import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users.effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { usersReduces } from './users.reducer';

@NgModule({
  imports: [StoreModule.forFeature(StoreFeature.Users, usersReduces), EffectsModule.forFeature([UsersEffects])],
})
export class UsersStoreModule {}
