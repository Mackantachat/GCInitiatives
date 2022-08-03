import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InitiativeService } from '@services/initiative/initiative.service';
import { error } from 'protractor';

@Component({
  selector: 'app-initiative-history-redirector',
  templateUrl: './initiative-history-redirector.component.html',
  styleUrls: ['./initiative-history-redirector.component.css']
})
export class InitiativeHistoryRedirectorComponent implements OnInit {

  constructor(
    private initiativeService: InitiativeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.initiativeService.id = params.id;
      this.initiativeService.GetInitiative(params.id).subscribe((response) => {
        if (response != null) {
          this.initiativeService.isRevise = response.isReviseFlow ? true : false;
          this.initiativeService.setGeneralData(response);
          this.router.navigate(['/initiative/information']);
        } else {
          this.router.navigate(['']);
        }
      }, error => {
        this.router.navigate(['']);
      });
    });
  }

}
