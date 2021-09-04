import { makeAutoObservable } from 'mobx';

export class DriverStore {
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.total += 1;
  }
}

export const driverStore = new DriverStore();
