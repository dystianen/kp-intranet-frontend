import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ckeditor5Conf } from '../setting/ckeditor5';

@Component({
    selector: 'my-editor',
    templateUrl: './my-editor.component.html',
    styleUrls: ['./my-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: MyEditorComponent,
        },
    ],
})
export class MyEditorComponent implements OnInit, ControlValueAccessor {
    public Editor = Editor;

    constructor() {}

    ckeditor5Config = ckeditor5Conf.config;

    ngOnInit(): void {}

    _contentEditor = '';

    get contentEditor(): string {
        return this._contentEditor;
    }

    set contentEditor(value: string) {
        this._contentEditor = value;
        this.propagateChange(this._contentEditor);
    }

    writeValue(value: string) {
        if (value !== undefined) {
            this.contentEditor = value;
        }
    }

    propagateChange = (_: any) => {};
    propagateTouched = (_: any) => {};

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.propagateTouched = fn;
    }

    touched($event) {
        this.propagateTouched($event);
    }
}
