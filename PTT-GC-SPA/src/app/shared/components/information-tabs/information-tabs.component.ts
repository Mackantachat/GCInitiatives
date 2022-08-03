import { Component, ViewEncapsulation, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { StatusService } from '@services/status/status.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { CapexService } from '@services/capex/capex.service';
import { Initiative } from '@models/initiative';

@Component({
  selector: 'app-information-tabs',
  templateUrl: './information-tabs.component.html',
  styleUrls: ['./information-tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InformationTabsComponent implements OnInit, OnDestroy {

  @ViewChild('informationTabs', { static: false }) informationTabs: TabsetComponent;

  constructor(
    private initiativeService: InitiativeService,
    private statusService: StatusService,
    private capexService: CapexService,
  ) { }

  id: any;

  status: string;
  stage: string;

  IsCim = false;
  IsPim = false;
  IsDim = false;
  IsCapex = false;
  IsMax = false;
  IsCpi = false;
  IsRandD = false;
  IsStrategy = false;
  IsOther = false;
  IsShowStatus = false;

  DetailName: string;
  View: any = 0;

  disableSubmitToCapex: any;

  get IsCimAndStrategy() {
    return ((this.IsCim === true) || (this.IsStrategy === true)) && !this.IsMax === true;
  }

  get IsMaxAndCapex() {
    return (this.IsMax === true) || (this.IsCapex === true) || (this.IsDim);
    //return true;
  }

  get IsCheckCapex() {
    if (this.IsCim) {
      return false;
    } else if (this.IsDim) {
      return false;
    } else {
      return (this.IsCapex === true) || (this.IsMax === false && !this.IsCim && !this.IsStrategy);
    }

  }

  ApproveCapex: boolean;
  ApproveAdmin: boolean;

  CheckSubmitTo: boolean;

  IsCheckCreatenew: boolean;
  IsCheckAddmoreCapex: boolean;
  IsCheckReturn: boolean;
  IsCheckRequestpool: boolean;
  IsCheckAddmorepool: boolean;
  IsRequestCapex: boolean;

  pagePool = 'pool-view';
  statusView = 'true';

  value: string;
  CheckType: any;
  CapexType: any;

  ngOnInit(): void {
    this.initiativeService.viewMode = true;
    this.id = (sessionStorage.getItem('id'));
    this.GetSuggestStatus();
    if (this.id) { this.GetInitiative(); }
    this.GetCapexsInformationBySubmit();
  }


  ngOnDestroy() {
    this.initiativeService.viewMode = false;
  }


  CheckInformationTab() {
    if (this.informationTabs) {
      if (sessionStorage.getItem('InformationTab')) {
        switch (sessionStorage.getItem('InformationTab')) {
          case 'General Information':
            this.informationTabs.tabs[0].active = true;
            break;
          case 'Detail Information (CIM & Strategy)':
            this.informationTabs.tabs[1].active = true;
            break;
          case 'Detail Information (Max)':
          case 'Detail Information (Request CAPEX)':
            this.informationTabs.tabs[1].active = true;
            break;
          case 'Impact Tracking':
            this.informationTabs.tabs[2].active = true;
            break;
          case 'Progress':
            this.informationTabs.tabs[3].active = true;
            break;
          case 'Status':
            this.informationTabs.tabs[4].active = true;
            break;
          default:
            this.informationTabs.tabs[0].active = true;
            break;
        }
      }
    }
  }

  GetCapexsInformationBySubmit() {
    this.capexService.GetCapexsInformationBySubmit(this.id).subscribe(Response => {
      if (Response.length !== 0) {
        this.View = Response.length - 1;
        this.CapexType = Response[this.View].capexType;
        if (this.CapexType === 'Createnew') {
          this.IsCheckCreatenew = true;
        } else if (this.CapexType === 'AddmoreCapex') {
          this.IsCheckAddmoreCapex = true;
        } else if (this.CapexType === 'Return') {
          this.IsCheckReturn = true;
        } else if (this.CapexType === 'Addmorepool') {
          this.IsCheckAddmorepool = true;
        } else if (this.CapexType === 'Requestpool') {
          this.IsCheckRequestpool = true;
        }
      }
    });
  }

  OnSelect(data: TabDirective): void {
    this.value = data.heading;
    sessionStorage.setItem('InformationTab', this.value);
  }

  CheckSubmit(submit) {
    this.CheckSubmitTo = submit;
  }

  ResourceNeededCheck() {
    let stage = ['Admin Check', 'First Review', 'First Review-1', 'First Review-2', 'Initiative-1', 'Initiative-2', 'Prelim F/S', 'Prelim F/S-1',
      'Detail F/S-1', 'Detail F/S-2', 'Detail F/S-3', 'Detail F/S-4', 'Detail F/S-5', 'Detail F/S-6', 'Detail F/S-7', 'Detail F/S-8',
      'Pre-DD-1', 'Pre-DD-2', 'Pre-DD-3', 'Pre-DD-4', 'Pre-DD-5', 'Pre-DD-6', 'Pre-DD-7', 'Pre-DD-8'];
    if (this.stage && !stage.includes(this.stage)) {
      return true;
    }
    else {
      return false;
    }
  }

  GetSuggestStatus() {
    this.initiativeService.GetSuggestStatus(this.id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.IsCim = response.cim ? true : false;
      this.IsDim = response.dim ? true : false;
      this.IsPim = response.pim ? true : false;

      //this.IsCapex = response.directCapex ? true : false;
      this.IsCapex = response.directCapex || response.dim || response.pim
        || (response.isRequestCapex && response.max)
        || (response.isRequestCapex && (response.stage.startsWith('DD') || response.stage.startsWith('Detail F/S')
          || response.stage.startsWith('Pre-DD') || response.stage.startsWith('Seeking Potential')))
        ? true : false;


      this.IsStrategy = response.strategy ? true : false;
      this.IsMax = response.max ? true : false;


      if (this.IsMax) {
        this.DetailName = 'Detail Information (Max)';
        this.IsCapex = false;
      }

      if (this.IsCapex) {
        this.DetailName = 'Detail Information (Request CAPEX)';
      }

      //Tempolary
      if ((this.IsDim || this.IsPim) && !this.IsMax) {
        this.DetailName = 'Detail Information';
        this.IsCapex = true;
      }


      const check = { status: this.status, stage: this.stage };
      this.statusService.CheckInitiativeDetail(check).subscribe(result => {
        this.ApproveCapex = this.IsCapex ? true : false;
        this.ApproveAdmin = result;
        this.IsShowStatus = true;
        setTimeout(() => this.CheckInformationTab(), 10);
      });
    });
  }

  CimStageCheck() {
    let stage = ['Admin Check', 'First Review', 'First Review-1', 'First Review-2'];
    if (this.IsCim && this.stage && !stage.includes(this.stage)) {
      return true;
    } else {
      return false;
    }
  }

  GetInitiative() {
    this.initiativeService.GetInitiative(this.id).subscribe(response => {
      this.IsRequestCapex = response.isRequestCapex ? true : false;
      if (response.initiativeType === 'Request Pool') {
        this.CheckType = 'true';
      } else {
        this.CheckType = 'false';
      }

      if (response.initiativeType === 'Request Pool' || response.initiativeType === 'directCapex') {
        this.disableSubmitToCapex = 'false';
      } else {
        this.disableSubmitToCapex = 'true';
      }
    });
  }
}
