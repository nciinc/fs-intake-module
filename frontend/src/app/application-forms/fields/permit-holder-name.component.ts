import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-permit-holder-name',
  templateUrl: './permit-holder-name.component.html'
})
export class PermitHolderNameComponent {
  @Input() applicantInfo: FormGroup;
  @Input() type: string;
  @Input() name: string;
  @Input() prefix = 'name';

  constructor(public afs: ApplicationFieldsService) {}
}
