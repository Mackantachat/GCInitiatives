import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtil {

  GetDate(date) {
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  }

  SetDate(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  SetYear(date) {
    return date.getFullYear().toString();
  }

  get GetToday() {
    let today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(), 0, 0, 0);
  }

  GetDateOnly(dateInput) {
    let date = new Date(dateInput);
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(), 0, 0, 0);
  }

  GetFullYear(dateInput) {
    let date = new Date(dateInput);
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(), 0, 0, 0).getFullYear();
  }

  get GetCurrentMonth() {
    let today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      1, 0, 0, 0);
  }

  GetRunRateMonth(date: Date, index: number) {
    // let today = new Date();
    return new Date(
      date.getFullYear(),
      date.getMonth() + index,
      1, 0, 0, 0);
  }

  convertDateUTC(dateInput) {
    let date = new Date(dateInput);
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(), 0, 0, 0));
  }

  GetThreeMonthAgo(dateInput) {
    let date = new Date(dateInput);
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 90, 0, 0, 0));
  }

  GetNextYearDate(dateInput) {
    let date = new Date(dateInput);
    return new Date(Date.UTC(
      date.getFullYear() + 1,
      date.getMonth(),
      date.getDate(), 0, 0, 0));
  }

  GetMinDate(data: { year: string; month: number }) {
    //return;
    if (!data) {
      return;
    }
    let minYear: number = 0;
    let minMonth: number = 0;
    // if (data.month == 0) {
    //   minYear = (parseInt(data.year) - 1);
    //   minMonth = 12;
    // } else {
    minYear = parseInt(data.year);
    minMonth = data.month;
    // }
    return new Date(
      minYear,
      minMonth,
      1, 0, 0, 0);
  }

  GetMaxDate(data: { year: string; month: number }) {
    // return;
    if (!data) {
      return;
    }
    let maxYear: number = 0;
    let maxMonth: number = 0;
    // if (data.month == 11) {
    //   maxYear = (parseInt(data.year) + 1);
    //   maxMonth = 1;
    // } else {
    maxYear = parseInt(data.year);
    maxMonth = data.month + 1;
    // }
    return new Date(
      maxYear,
      maxMonth,
      0, 0, 0, 0);
  }
}
