import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private loadingBS = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.loadingBS.asObservable();

  private counter = 0;

  startLoading()
  {
    this.counter++;
    this.loadingBS.next(true);
  }

  stopLoading()
  {
    if (this.counter > 0)
    {
      this.counter--;
    }

    if(this.counter == 0)
    {
      this.loadingBS.next(false);
    }
  }
}
