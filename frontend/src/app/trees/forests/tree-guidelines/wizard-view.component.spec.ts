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
  
  it('should go to previous step from later step', () => {
    component.forest = forest;
    component.nextStep();
    component.previousStep();
    expect(component.currentStep.step).toEqual(0);
  });

  it('should go to previous step with subsections from later step with no subsections', () => {
    component.forest = forest;
    component.jumpToStep({
        "step": 4,
        "title": "Trip planning"
    });
    component.previousStep();
    expect(component.currentStep.step).toEqual(3);
  });

  it('should go to previous step without subsections from later step with no subsections', () => {
    component.forest = forest;
    component.jumpToStep({
        "step": 5,
        "title": "Safety first"
    });
    component.previousStep();
    expect(component.currentStep.step).toEqual(4);
  });

  it('should go to next step', () => {
    component.forest = forest;
    component.nextStep();
    expect(component.currentStep.step).toEqual(1);
  });

  it('should go to next subsection step', () => {
    component.forest = forest;
    component.jumpToStep({
      "step": 1,
      "title": "Where to Find Your Tree",
      "subsections": [
          {
              "step": 0,
              "title": "Districts and maps"
          },
          {
              "step": 1,
              "title": "Prohibited areas"
          },
          {
              "step": 2,
              "title": "Places to try"
          }
      ]
    });
    component.currentSubsection = component.findSubsectionStep(component.currentStep, 2);
    component.nextStep();
    expect(component.currentStep.step).toEqual(2);
  });

});
