import { Phone } from '../../models/phone';

export interface PhonesState {
  phones: Phone[];
}

export const initialPhonesState: PhonesState = {
  phones: [],
};
