import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: ['./dashboard-search.component.css']
})
export class DashboardSearchComponent implements OnInit {

  constructor(private fb: FormBuilder,) { }

  SearchIcon = false;

  @Output() OnRefreshData = new EventEmitter();
  @Output() OnSearchClick = new EventEmitter();

  searchForm = this.fb.group({
    username: '',
    text: '',
  });
  ngOnInit(): void {

  }


  Search() {
    this.OnSearchClick.emit(this.searchForm.value.text);
  }

  RefreshData() {
    this.OnRefreshData.emit('refresh');
    this.searchForm.patchValue({ "text": null });
  }

}
