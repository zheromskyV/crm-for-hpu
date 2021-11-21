import { FormControl, ValidationErrors } from '@angular/forms';

export function BirthdayValidator({ value }: FormControl): ValidationErrors | null {
  if (!value) {
    return null;
  }

  const birthday = new Date(value).getTime();
  const now = Date.now();

  return now < birthday ? { error: 'Incorrect date' } : null;
}
