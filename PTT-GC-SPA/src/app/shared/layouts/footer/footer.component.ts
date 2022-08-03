import { Component, OnInit } from '@angular/core';
import { BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  date = new Date();
  year = this.date.getFullYear();

  isLoading = false;

  constructor(
    private broadcastService: BroadcastService
  ) { }

  ngOnInit() {
    this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      this.LoadingPage();
    });
  }

  LoadingPage() {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 2500);
  }

}
