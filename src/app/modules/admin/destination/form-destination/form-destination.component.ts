import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-form-destination',
  templateUrl: './form-destination.component.html',
  styleUrls: ['./form-destination.component.scss']
})
export class FormDestinationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private destinationService: DestinationService) { }

  form: FormGroup;

  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      destination: '',
      cost: ''
    })

    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this.destinationService.getDestination(this.dialogData.id).subscribe((res) => {
        this.form.patchValue(res);
      })
    }
  }

  /**Submit Form to API
   * @param f 
   */
  submitForm(f: NgForm) {

    /**
     * Add new Destination
     */
    if (this.dialogData.type == 'add') {
      this.destinationService.createDestination(f.value).subscribe((res) => {
        this.destinationService.getDestinations().subscribe();
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {
      this.destinationService.updateDestination(this.dialogData.id, f.value).subscribe((res) => {
        this.destinationService.getDestinations().subscribe();
        this.dialogRef.close();
      });
    }
  }


}
