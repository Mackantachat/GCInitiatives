import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-investment-modal',
  templateUrl: './investment-modal.component.html',
  styleUrls: ['./investment-modal.component.css']
})
export class InvestmentModalComponent {

  @Input() typeOfInvestment;
  @Input() replace: string;
  @Input() obsolate: string;
  @Input() confirmText: string;

  @Output() modelClose = new EventEmitter();
  @Output() confirm    = new EventEmitter();

  constructor() { }

  hideChildModal() {
    this.modelClose.emit();
  }

  CheckMaintainOrReplacement() {
    this.confirmText = this.replace === 'in-kind'     && this.obsolate === 'yes' ? 'Replacement'          : 'Replacement';
    this.confirmText = this.replace === 'in-kind'     && this.obsolate === 'no'  ? 'Replacement'          : 'Replacement';
    this.confirmText = this.replace === 'not-in-kind' && this.obsolate === 'yes' ? 'Replacement'          : 'Replacement';
    this.confirmText = this.replace === 'not-in-kind' && this.obsolate === 'no'  ? 'Maintain Reliability' : 'Replacement';
  }

  OnChangeReplace() {
    this.CheckMaintainOrReplacement();
  }

  OnChangeObsolate() {
    this.CheckMaintainOrReplacement();
  }

  Confirm() {
    this.confirm.emit(this.confirmText);
  }

}
