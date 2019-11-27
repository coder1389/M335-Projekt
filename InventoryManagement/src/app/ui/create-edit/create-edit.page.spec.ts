import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateEditPage } from './create-edit.page';

describe('CreateEditPage', () => {
  let component: CreateEditPage;
  let fixture: ComponentFixture<CreateEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
