import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numtobool'})
export class NumToBool implements PipeTransform {
  transform(value: number): boolean {
    return value == 0 ? false: true;
  }
}