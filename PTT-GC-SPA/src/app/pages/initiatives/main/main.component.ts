import { Component, OnInit, HostListener } from '@angular/core';
import { RemoveService } from '@services/remove/remove.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainInitiativeComponent implements OnInit {

  constructor(
    private removeService: RemoveService
  ) { }

  @HostListener('window:beforeunload') RefreshForm() {
    sessionStorage.removeItem('box');
    sessionStorage.removeItem('tab');
    sessionStorage.removeItem('CurrentPageOverview');
    sessionStorage.removeItem('CurrentPageMyOwn');
    sessionStorage.removeItem('CurrentPageMyTask');
    if (window.location.href.split("/").indexOf("capex") !== -1 && window.location.href.split("/").indexOf("initiative") !== -1) {
      //do not clear initiativeform when capex page reloading
    }
    else {
      this.removeService.Form();
    }
    this.removeService.Suggestion();
  }

  ngOnInit() {
  }
}
