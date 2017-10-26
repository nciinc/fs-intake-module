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

  it('should go to previous step with subsections from later step with subsections', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 3,
        'title': 'Tree Cutting',
        'subsections': [
            {
                'step': 0,
                'title': 'Before you cut'
            },
            {
                'step': 1,
                'title': 'When you cut'
            },
            {
                'step': 2,
                'title': 'After you cut'
            }
        ]
    });
    component.currentSubsection = component.findSubsectionStep(component.currentStep, 0);
    component.previousStep();
    expect(component.currentStep.step).toEqual(2);
  });

  it('should go to previous step with subsections from later step with no subsections', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 4,
        'title': 'Trip planning'
    });
    component.previousStep();
    expect(component.currentStep.step).toEqual(3);
  });

  it('should go to previous step without subsections from later step with no subsections', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 5,
        'title': 'Safety first'
    });
    component.previousStep();
    expect(component.currentStep.step).toEqual(4);
  });

  it('should go to previous step with subsections after currentSubsection removed', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 3,
        'title': 'Tree Cutting',
        'subsections': [
            {
                'step': 0,
                'title': 'Before you cut'
            },
            {
                'step': 1,
                'title': 'When you cut'
            },
            {
                'step': 2,
                'title': 'After you cut'
            }
        ]
    });
    component.currentSubsection = null;
    component.previousStep();
    expect(component.currentStep.step).toEqual(3);
  });

  it('should go to previous step without subsections from later step, second subsection', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 1,
        'title': 'Where to Find Your Tree',
        'subsections': [
            {
                'step': 0,
                'title': 'Districts and maps'
            },
            {
                'step': 1,
                'title': 'Prohibited areas'
            },
            {
                'step': 2,
                'title': 'Places to try'
            }
        ]
    });
    component.currentSubsection = component.findSubsectionStep(component.currentStep, 1);
    component.previousStep();
    expect(component.currentStep.step).toEqual(1);
  });

  it('should go to next step', () => {
    component.forest = forest;
    component.nextStep();
    expect(component.currentStep.step).toEqual(1);
  });

  it('should go to next step which has subsections', () => {
    component.forest = forest;
    component.jumpToStep({
      'step': 1,
      'title': 'Where to Find Your Tree',
      'subsections': [
          {
              'step': 0,
              'title': 'Districts and maps'
          },
          {
              'step': 1,
              'title': 'Prohibited areas'
          },
          {
              'step': 2,
              'title': 'Places to try'
          }
      ]
    });
    component.currentSubsection = component.findSubsectionStep(component.currentStep, 2);
    component.nextStep();
    expect(component.currentStep.step).toEqual(2);
  });

  it('should go to next step which has subsections after currentSubsection is removed', () => {
    component.forest = forest;
    component.jumpToStep({
      'step': 1,
      'title': 'Where to Find Your Tree',
      'subsections': [
          {
              'step': 0,
              'title': 'Districts and maps'
          },
          {
              'step': 1,
              'title': 'Prohibited areas'
          },
          {
              'step': 2,
              'title': 'Places to try'
          }
      ]
    });
    component.currentSubsection = null;
    component.nextStep();
    expect(component.currentStep.step).toEqual(1);
  });

  it('should go to next step which has no subsections', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 4,
        'title': 'Trip planning'
    });
    component.nextStep();
    console.log(JSON.stringify(component.sectionInfo, null, 4))
    expect(component.currentStep.step).toEqual(5);
  });

  it('should go to next step which has no subsections', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 3,
        'title': 'Tree Cutting',
        'subsections': [
            {
                'step': 0,
                'title': 'Before you cut'
            },
            {
                'step': 1,
                'title': 'When you cut'
            },
            {
                'step': 2,
                'title': 'After you cut'
            }
        ]
    });
    component.currentSubsection = component.findSubsectionStep(component.currentStep, 2);
    component.nextStep();
    expect(component.currentStep.step).toEqual(4);
  });

  it('should go to next step without subsections from later step, second subsection', () => {
    component.forest = forest;
    component.jumpToStep({
        'step': 1,
        'title': 'Where to Find Your Tree',
        'subsections': [
            {
                'step': 0,
                'title': 'Districts and maps'
            },
            {
                'step': 1,
                'title': 'Prohibited areas'
            },
            {
                'step': 2,
                'title': 'Places to try'
            }
        ]
    });
    component.currentSubsection = component.findSubsectionStep(component.currentStep, 1);
    component.nextStep();
    expect(component.currentStep.step).toEqual(1);
  });

});
