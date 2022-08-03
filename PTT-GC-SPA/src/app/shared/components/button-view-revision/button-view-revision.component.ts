import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CapexService } from '@services/capex/capex.service';


@Component({
  selector: 'app-button-view-revision',
  templateUrl: './button-view-revision.component.html',
  styleUrls: ['./button-view-revision.component.css']
})
export class ButtonViewRevisionComponent implements OnInit {

  constructor(
    private capexService: CapexService,
  ) { }

  @Input() id;
  @Input() CapexType;

  Revistion: any;
  capexType: any;
  Revistion_: any;
  Rev: any[] = [];
  evwnt: any;

  ngOnInit(): void {
    this.GetCapexsInformationBySubmit();
  }

  GetCapexsInformationBySubmit() {
    this.capexService.GetCapexsInformationBySubmit(this.id).subscribe(Revistion => this.Revistion_ = Revistion);

  }

  ViewByRevision(event: any) {
    this.evwnt = event;
    
    for (let i = 0; this.Revistion_.length > i; i++) {

      this.Rev = this.Revistion_[i].capexInformationId;

      if (this.evwnt == this.Rev) {

        this.CapexType = this.Revistion_[i].capexType;

        if (this.CapexType == 'Createnew') {
          var url = '/initiative/view-revistion';
          window.open(url);
        }
        else if (this.CapexType == 'AddmoreCapex') {
          var url = '/initiative/view-revistion-addmore';
          sessionStorage.setItem('Capexid', this.evwnt);
          window.open(url);
        }
        else if (this.CapexType == 'Return') {
          var url = '/initiative/view-revistion-return';
          window.open(url);
        }
        else if (this.CapexType == 'Requestpool') {
          sessionStorage.setItem('page', 'pool-view');
          sessionStorage.setItem('statusView', 'true');
          var url = '/initiative/view-revistion-pool';
          window.open(url);
        }
        else if (this.CapexType == 'Addmorepool') {
          var url = '/initiative/view-revistion-addmore-pool';
          window.open(url);
        }
      }

    }

  }

}
