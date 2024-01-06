import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../../Application';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrl: './add-application.component.css'
})
export class AddApplicationComponent implements OnInit{
  addForm!: FormGroup;
  notificationsActive: boolean = false;
  application: Application = {
    company_name: this.addForm.value.company_name,
    job_role: this.addForm.value.jobRole,
    application_status: this.addForm.value.status,
    application_deadline: this.addForm.value.deadline,
    user_id: localStorage.getItem('applifyUser') ?? "",
    notifications_active: this.notificationsActive
  };

  constructor(private applicationService: ApplicationService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      companyName: ["", [Validators.required]],
      jobRole: ["", [Validators.required]],
      status: ["", [Validators.required]],
      deadline: ["", [Validators.required]]
    });
  }

  handleSubmit() {
    this.applicationService.createApplication(this.application).subscribe(() => {});
  }

  toggleNotificationsActive(){
    this.notificationsActive = !this.notificationsActive;
  }
}
