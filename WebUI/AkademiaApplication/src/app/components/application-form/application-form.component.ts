import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {

  // <!-- id: number
  // number: string
  // title: string
  // description: string
  // applicantsName: string
  // createdDate: Date
  // applicationStatus: ApplicationStatus
  // completionDate: Date -->

  appForm = this.fb.group({
    id: null,
    number: new FormControl<string|null>({value: null, disabled: true}, Validators.required),
    title: [null, Validators.required],
    description: [null, Validators.required],
    applicantsName: [null, Validators.required],
    createdDate: new FormControl<Date|null>({value: null, disabled: true}, Validators.required),
    applicationStatus: new FormControl({value: 'New', disabled: true}, Validators.required),
    completionDate: null
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
    private api: ApplicationApiService) {
       
      
    }

  onSubmit(): void {
    alert('Thanks!');
  }
}
