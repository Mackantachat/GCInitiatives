import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-initiative-search',
  templateUrl: './initiative-search.component.html',
  styleUrls: ['./initiative-search.component.css']
})
export class InitiativeSearchComponent implements OnChanges {

  constructor(
    private fb: FormBuilder,
  ) { }

  @Input() advanced;
  @Input() name;

  @Output() modelShow = new EventEmitter();
  @Output() changeSearch = new EventEmitter();
  @Output() changePageLength = new EventEmitter();
  @Output() changeStatus = new EventEmitter();
  @Output() refresh = new EventEmitter();

  SearchIcon = true;

  isClicked = false;

  length = [10, 25, 50, 100];

  searchForm = this.fb.group({
    username: '',
    text: '',
    progress: true,
    complete: true,
    cancel: true
  });

  typeStatus = this.fb.group({
    progress: true,
    complete: true,
    cancel: true,
    createdBy: '',
    username: '',
    text: '',
    id: '',
    name: '',
    status: '',
    type: '',
    ownerName: '',
    organization: '',
    plant: '',
    typeOfInvestment: '',
    registerDateSince: '',
    registerDateTo: ''
  });

  ngOnChanges(): void {
    if (this.advanced) {
      this.typeStatus.patchValue(this.advanced);
    } else {
      this.typeStatus.patchValue({
        id: '',
        name: '',
        status: '',
        type: '',
        ownerName: '',
        organization: '',
        plant: '',
        typeOfInvestment: '',
        registerDateSince: '',
        registerDateTo: ''
      });
    }
  }

  SearchChange() {
    if (this.searchForm.controls.text.value) {
      this.SearchIcon = false;
    } else {
      this.SearchIcon = true;
    }
  }

  ShowModal() {
    this.modelShow.emit(this.typeStatus.value);
  }

  Search() {
    this.searchForm.patchValue({
      progress: this.typeStatus.controls.progress.value,
      complete: this.typeStatus.controls.complete.value,
      cancel: this.typeStatus.controls.cancel.value
    });
    this.changeSearch.emit(this.searchForm.value);
  }

  ChangePageLength(e) {
    this.changePageLength.emit(e.target.value);
  }

  OnChangeStatus() {
    if (this.searchForm.controls.text.value) {
      this.typeStatus.patchValue({ text: this.searchForm.controls.text.value });
    } else {
      this.typeStatus.patchValue({ text: '' });
    }
    this.changeStatus.emit(this.typeStatus.value);
  }

  Refresh() {
    this.isClicked = true;
    this.searchForm.patchValue({ username: '', text: '' });
    this.refresh.emit();
    setTimeout(() => this.isClicked = false, 1000);
  }

}
