import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from './auth/store/auth-store.module';
import { CoreStoreModule } from './core/store/core-store.module';
import { UsersStoreModule } from './users/store/users-store.module';
import { RequestsStoreModule } from './requests/store/requests-store.module';
import { ArticlesStoreModule } from './articles/store/articles-store.module';
import { PhonesStoreModule } from './phones/store/phones-store.module';
import { AnalyticsStoreModule } from './analytics/store/analytics-store.module';

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
    RequestsStoreModule,
    ArticlesStoreModule,
    PhonesStoreModule,
    AnalyticsStoreModule,
  ],
})
export class AppStoreModule {}
