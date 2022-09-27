import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsRepositoryComponent } from './applications-repository.component';

describe('ApplicationsRepositoryComponent', () => {
  let component: ApplicationsRepositoryComponent;
  let fixture: ComponentFixture<ApplicationsRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
