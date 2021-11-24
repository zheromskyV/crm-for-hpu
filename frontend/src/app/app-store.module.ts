import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from './auth/store/auth-store.module';
import { CoreStoreModule } from './core/store/core-store.module';
import { UsersStoreModule } from './users/store/users-store.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AuthStoreModule,
    CoreStoreModule,
    UsersStoreModule,
  ],
})
export class AppStoreModule {}
