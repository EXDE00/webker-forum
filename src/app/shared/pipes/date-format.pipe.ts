import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | undefined, ...args: unknown[]): string {
    if (value) {
      let tzoffset = value.getTimezoneOffset() * 60000;
      let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().
        replace('Z', ' ').
        replace('T', ' ').
        replace(/\.\d{3}/, '');
      return localISOTime;
    }
    else return "";
  }

}
