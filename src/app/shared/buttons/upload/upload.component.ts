import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'button-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    @Input() disabled: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}
