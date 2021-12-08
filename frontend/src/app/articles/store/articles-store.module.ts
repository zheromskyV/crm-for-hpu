import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { articlesReducer } from './articles.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffects } from './articles.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeature.Articles, articlesReducer),
    EffectsModule.forFeature([ArticlesEffects]),
  ],
})
export class ArticlesStoreModule {}
