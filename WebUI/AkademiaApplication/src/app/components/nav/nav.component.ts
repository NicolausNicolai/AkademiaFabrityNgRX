import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { AppState } from 'src/app/store';
import { select, State } from '@ngrx/store';
import { isLoadingSelector } from 'src/app/store/application.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public isLoading$: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public loadingService: LoadingService,
    private store: State<AppState>) {

      this.isLoading$ = this.store
      .pipe(
          select(isLoadingSelector)
      );
    

      // loadingService.isLoading$.subscribe(isLoading => {
      //     setTimeout(() => {
      //         this.isLoading = isLoading;
      //     });
      // });
    }

}
