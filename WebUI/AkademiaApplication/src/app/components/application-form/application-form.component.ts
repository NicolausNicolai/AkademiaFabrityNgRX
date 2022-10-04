import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApplicationStatus } from 'src/app/models/applicationStatus';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { Application } from 'src/app/models/application';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { loadApplication, newApplication, saveApplication } from 'src/app/store/application.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectCurrentlyEditedApplication } from 'src/app/store/application.selectors';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  appForm = this.fb.group({
    id: new FormControl<number>({value: 0, disabled: true}, Validators.required),
    number: new FormControl<string|null>({value: null, disabled: true}, Validators.required),
    title: new FormControl<string|null>({value: null, disabled: false}, Validators.required),
    description: new FormControl<string|null>({value: null, disabled: false}, Validators.required),
    applicantsName: new FormControl<string|null>({value: null, disabled: false}, Validators.required),
    createdDate: new FormControl<Date|null>({value: null, disabled: true}, Validators.required),
    applicationStatus: new FormControl<ApplicationStatus>({value: ApplicationStatus.New, disabled: false}, Validators.required),
    completionDate: new FormControl<Date|null>({value: null, disabled: true}, Validators.required)
  });

  public isNew : boolean = true;
  private currentlyEditedApplication: Application | undefined = undefined;

  constructor(private fb: FormBuilder,
    private api: ApplicationApiService,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>) {
  }
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  ngOnInit()
  {
    this.route.params
    .subscribe(routeParams => {
      const id = routeParams['id'] as number;

      if (id != undefined)
      {
        this.store.dispatch(loadApplication({id}));
      }
      else
      {
        this.store.dispatch(newApplication());
      }

    });

    this.store.select(selectCurrentlyEditedApplication)
      .pipe(takeUntil(this.destroy))
        .subscribe(r => {
          if (r !== undefined)
          {
            this.currentlyEditedApplication = r;
            this.buildForm(r);
            this.isNew = r?.applicationStatus == ApplicationStatus.New;
          }
          else
          {
            this.isNew = true;
          }
        })
  }

  onSubmit(): void {

    const application : Application = {
      ...this.currentlyEditedApplication,
      ...this.appForm.value 
    } as Application

    if (this.appForm.valid)
    {
      this.appForm.disable();
      this.store.dispatch(saveApplication({application}))

      // this.api.saveApplication(this.appForm.value).subscribe(r => {
      //   console.log(r);
      //   this.location.replaceState(`app-form/${r.id}`);
      //   this.appForm.enable();
      //   this.isNew = r.applicationStatus == ApplicationStatus.New;
      //   this.buildForm(r);
      //   console.log("isnew", this.isNew);
      // });
    }
  }

  buildForm(application: Application)
  {
    const isAppStatusModificationDisabled = application.applicationStatus != ApplicationStatus.New;
    this.appForm = this.fb.group({
      id: new FormControl<number|null>({value: application.id, disabled: true}, Validators.required),
      number: new FormControl<string|null>({value: application.number, disabled: true}, Validators.required),
      title: new FormControl<string|null>({value: application.title, disabled: !this.isNew}, Validators.required),
      description: new FormControl<string|null>({value: application.description, disabled: !this.isNew}, Validators.required),
      applicantsName: new FormControl<string|null>({value: application.applicantsName, disabled: !this.isNew}, Validators.required),
      createdDate: new FormControl<Date|null>({value: application.createdDate, disabled: true}, Validators.required),
      applicationStatus: new FormControl<ApplicationStatus | null>({value: application.applicationStatus, disabled: isAppStatusModificationDisabled }, Validators.required),
      completionDate: new FormControl<Date|null>({value: application.completionDate, disabled: true}, Validators.required)
    });
  }
}
