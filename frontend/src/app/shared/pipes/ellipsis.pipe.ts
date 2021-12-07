import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxLength: number = 15): string {
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
  }
}
