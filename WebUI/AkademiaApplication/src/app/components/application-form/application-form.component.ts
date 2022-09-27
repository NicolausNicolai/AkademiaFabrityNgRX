import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApplicationStatus } from 'src/app/models/applicationStatus';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { Application } from 'src/app/models/application';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  appForm = this.fb.group({
    id: new FormControl<number>({value: 0, disabled: true}, Validators.required),
    number: new FormControl<string|null>({value: null, disabled: true}, Validators.required),
    title: new FormControl<string|null>({value: null, disabled: false}, Validators.required),
    description: new FormControl<string|null>({value: null, disabled: false}, Validators.required),
    applicantsName: new FormControl<string|null>({value: null, disabled: false}, Validators.required),
    createdDate: new FormControl<Date|null>({value: null, disabled: true}, Validators.required),
    applicationStatus: new FormControl<ApplicationStatus>({value: ApplicationStatus.New, disabled: true}, Validators.required),
    completionDate: new FormControl<Date|null>({value: null, disabled: true}, Validators.required)
  });


  public isNew : boolean = true;

  constructor(private fb: FormBuilder,
    private api: ApplicationApiService,
    private route: ActivatedRoute) {
  }

  ngOnInit()
  {
    this.route.params
    .subscribe(routeParams => {
      const id = routeParams['id'] as number;

      if (id != undefined)
      {
        console.log(`Zmieniono ID: ${id}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);

      }

    });
  }

  onSubmit(): void {

    this.appForm.controls.createdDate.setValue(new Date(Date.now()));

    if (this.appForm.valid)
    {
      this.appForm.disable();
      this.api.saveApplication(this.appForm.value).subscribe(r => {
        console.log(r);
        this.appForm.setValue(r);
        this.appForm.enable();
      });
    }
  }

  buildForm(application: Application)
  {
    this.appForm = this.fb.group({
      id: new FormControl<number|null>({value: application.id, disabled: true}, Validators.required),
      number: new FormControl<string|null>({value: application.number, disabled: true}, Validators.required),
      title: new FormControl<string|null>({value: application.title, disabled: false}, Validators.required),
      description: new FormControl<string|null>({value: application.description, disabled: false}, Validators.required),
      applicantsName: new FormControl<string|null>({value: application.applicantsName, disabled: false}, Validators.required),
      createdDate: new FormControl<Date|null>({value: application.createdDate, disabled: true}, Validators.required),
      applicationStatus: new FormControl<ApplicationStatus | null>({value: application.applicationStatus, disabled: true}, Validators.required),
      completionDate: new FormControl<Date|null>({value: application.completionDate, disabled: true}, Validators.required)
    });

    this.isNew = false;
    // Tutaj po załadowaniu zmień route na taki żeby było w nim ID nowozapisanego 
  }

}
