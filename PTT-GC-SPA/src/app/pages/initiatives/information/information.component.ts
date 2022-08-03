import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { ResponseService } from '@errors/response/response.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InformationComponent implements OnInit {

  id: number;

  status: string;
  remark: string;
  stage: string;
  name = 'Initiatives Infomation';


  constructor(
    private initiativeService: InitiativeService,
    private response: ResponseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.initiativeService.id) {

      this.id = this.initiativeService.id;

      this.initiativeService.GetInitiative(this.id).subscribe(response => {
        this.status = response.status;
        this.stage = response.stage;
        this.remark = response.remark ? response.remark : null;
        this.initiativeService.initiativeName = response.name;

      }, error => this.response.error(error));
    } else {
      this.router.navigate(['/initiative/my-own']);
    }
  }
}
