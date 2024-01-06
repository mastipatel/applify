import { Component } from '@angular/core';
import { Application } from '../../../Application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  editOpen: boolean = false;
  applicationData: Application = {
    company_name: "",
    job_role: "",
    application_status: 0,
    application_deadline: 0,
    user_id: "",
    notifications_active: false
  }

  toggleEditOpen(){
    this.editOpen = !this.editOpen;
  }

  
}
