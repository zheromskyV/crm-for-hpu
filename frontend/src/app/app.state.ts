import { StoreFeature } from './constants/store.enum';
import { AuthState } from './auth/store/auth.state';

export interface AppState {
  [StoreFeature.Auth]: AuthState;
}
