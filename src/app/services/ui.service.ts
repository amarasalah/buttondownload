import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddMenu: boolean = false;
  private subject = new Subject<any>();

  constructor() { }
  
  toggleAddMenu(): void {
    this.showAddMenu = !this.showAddMenu;
    this.subject.next(this.showAddMenu);
}

  onToggle():Observable<any>{
    return this.subject.asObservable();
  }


}
