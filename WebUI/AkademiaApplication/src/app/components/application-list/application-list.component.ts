import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Application } from 'src/app/models/application';
import { ApplicationStatus } from 'src/app/models/applicationStatus';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApplicationListComponent {

  @Input() 
  dataSource!: Array<Application>;

  @Output()
  dataChanged = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Application>;

  public expandedElement: Application | null = null;
  columnsToDisplay = ['id', 'number', 'title', 'applicationStatus', 'aplicantsName', 'Actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];


  public applicationStatus = ApplicationStatus;

  constructor(private api: ApplicationApiService) {
    console.log("Tworzę ApplicationListComponent");
  }

  onApproveApplication(id: number)
  {
    this.api.approveApplication(id);
    this.dataChanged.emit();
  }

  onRejectApplication(id: number)
  {
    this.api.rejectApplication(id);
    this.dataChanged.emit();
  }

test(element: any)
{
  const ev = element == this.expandedElement ? 'example-element-detail-expanded' : 'example-element-detail-colapsed';
  console.log(element, ev);
  return ev;
}

}

