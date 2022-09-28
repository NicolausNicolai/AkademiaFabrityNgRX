import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public isLoading = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  constructor(private breakpointObserver: BreakpointObserver,
    public loadingService: LoadingService) {
      loadingService.isLoading$.subscribe(isLoading => {
          setTimeout(() => {
              this.isLoading = isLoading;
          });
      });
    }

}
