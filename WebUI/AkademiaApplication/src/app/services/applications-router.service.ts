import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsRouterService implements Resolve<any>{

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
  }
}
