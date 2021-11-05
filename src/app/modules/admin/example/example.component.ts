import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent
{
    accessToken = localStorage.getItem('accessToken');
    
    /**
     * Constructor
     */
    constructor()
    {
    }
}
