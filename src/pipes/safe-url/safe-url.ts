import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the SafeUrlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) {}

    transform(value: string, url: string = ''): any {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
    }
}
