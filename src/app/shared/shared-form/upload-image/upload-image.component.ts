import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-form-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {


  @Output() fileUpload = new EventEmitter<File>();
  @Input() name: string = "photo"
  @Input() title: string = "Thumbnail"
  @Input() preview: string
  @Input() width: number = 250;
  @Input() height: number = 150;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeThumbnail(e) {
    const thumbnailPreview = document.getElementById("thumbnailPreview") as HTMLImageElement;
    const file = e.target.files[0];
    if (file) {
      this.fileUpload.emit(file);
      thumbnailPreview.src = URL.createObjectURL(file);
    }
  }

}
