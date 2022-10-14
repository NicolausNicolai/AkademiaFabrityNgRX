import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectApplicationsLoaded, selectIsLoading } from 'src/app/store/application.selectors';
import { loadApplications } from 'src/app/store/application.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isLoading = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  constructor(private breakpointObserver: BreakpointObserver,
    public loadingService: LoadingService,
    private store: Store<AppState>) {

      store.select(selectIsLoading).subscribe(
        il => setTimeout(()=> this.isLoading = il)
      );

      // loadingService.isLoading$.subscribe(isLoading => {
      //     setTimeout(() => {
      //         this.isLoading = isLoading;
      //     });
      // });
    }
  ngOnInit(): void {


  }

  public getVersionInformation()
  {
    return environment.production? "version: prod" : "version: dev"
  }

}
