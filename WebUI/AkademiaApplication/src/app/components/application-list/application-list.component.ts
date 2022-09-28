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
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent {

  @Input() 
  dataSource!: Array<Application>;

  @Output()
  dataChanged = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Application>;

  expandedElement: PeriodicElement | null = null;
  displayedColumns = ['id', 'number', 'title', 'applicationStatus', 'aplicantsName', 'Actions','description'];
  public applicationStatus = ApplicationStatus;

  constructor(private api: ApplicationApiService) {
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
}

export interface PeriodicElement {
  description: string;
}