import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardViewComponent } from './wizard-view.component';
import { forest } from '../../_mocks/forest';
import { TreesService } from '../../_services/trees.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('WizardViewComponent', () => {
  let component: WizardViewComponent;
  let fixture: ComponentFixture<WizardViewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [WizardViewComponent],
        providers: [TreesService],
        imports: [HttpModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardViewComponent);
    component = fixture.componentInstance;
    component.forest = forest;
    fixture.detectChanges();
  });

  it('should go to previous step', () => {
    component.forest = forest;
    component.previousStep();
    expect(component).toBeTruthy();
  });
});
