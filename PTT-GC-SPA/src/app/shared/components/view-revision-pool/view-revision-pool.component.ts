import { Component, OnInit } from '@angular/core';
import { CapexService } from '@services/capex/capex.service';


@Component({
  selector: 'app-view-revision-pool',
  templateUrl: './view-revision-pool.component.html',
  styleUrls: ['./view-revision-pool.component.css']
})
export class ViewRevisionPoolComponent implements OnInit {

  constructor(
    private capexService: CapexService,
  ) { }

  id: any;
  pagePool = 'pool-view';
  statusView = "true";

  IsCheckCreatenew: boolean;
  IsCheckAddmoreCapex: boolean;
  IsCheckReturn: boolean;
  View: any;
  Rev: any;
  CapexType: any;

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));
    this.GetCapexsInformationBySubmit();
  }


  GetCapexsInformationBySubmit() {
    this.capexService.GetCapexsInformationBySubmit(this.id).subscribe(Response => {

      if (Response.length == 0) {
        this.View = Response.length
      }
      else if (Response.length > 0) {
        this.View = Response.length - 1;
      }

      this.CapexType = Response[this.View].capexType;

      if (this.CapexType == 'Createnew') {
        this.IsCheckCreatenew = true;
      }
      else if (this.CapexType == 'AddmoreCapex') {
        this.IsCheckAddmoreCapex = true;
      }
      else if (this.CapexType == 'Return') {
        this.IsCheckReturn = true;
      }

      // gช็คเพิ่มตรงนี้ค่ะ ว่าล่าสุดคืออะไร

    });
  }

}
