import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../../Application';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userID: string = localStorage.getItem('applifyUser') ?? "";
  addOpen: boolean = false;
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService){

  }

  ngOnInit(): void {
    this.applicationService.getByUserID(this.userID).subscribe((applications) => (this.applications = applications));
  }

  addToList(app: Application) {
    this.applications.push(app);
  }

  updateList(app: Application) {
    const index = this.applications.findIndex(item => item.application_id == app.application_id);
    if (index !== -1) {
      this.applications[index] = app;
    }
  }

  handleDelete(application_id: string) {
    this.applicationService.deleteApplication(application_id).subscribe(() => {
      this.applications = this.applications.filter((app) => app.application_id != application_id);
    })
  }

  toggleAddOpen(){
    this.addOpen = !this.addOpen;  
  }


}
