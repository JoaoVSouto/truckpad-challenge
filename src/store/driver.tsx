import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';

import { api } from 'services/api';

import { Driver, CNHDocument } from 'model/Driver';

export type DriverData = {
  id: number;
  name: string;
  birthDate: string;
  cpf: string;
  cnh?: {
    number: string;
    category: string;
    expiresAt: string;
  };
  address: {
    postalCode: string;
    name: string;
    state: string;
    city: string;
    streetName: string;
    neighborhood: string;
    streetNumber?: number;
    complement?: string;
  };
};

function parseDriver(driver: Driver) {
  const driverCpf = driver.documents.find(doc => doc.doc_type === 'CPF')
    ?.number as string;

  const driverCNH = driver.documents.find(doc => doc.doc_type === 'CNH') as
    | CNHDocument
    | undefined;

  return {
    id: driver.id,
    name: driver.name,
    birthDate: driver.birth_date,
    cpf: driverCpf,
    cnh: driverCNH
      ? {
          category: driverCNH.category,
          expiresAt: driverCNH.expires_at,
          number: driverCNH.number,
        }
      : undefined,
    address: {
      city: driver.addresses.city,
      name: driver.addresses.name,
      neighborhood: driver.addresses.neighborhood,
      postalCode: driver.addresses.postal_code,
      state: driver.addresses.state,
      streetName: driver.addresses.street_name,
      complement: driver.addresses.complement,
      streetNumber: driver.addresses.street_number,
    },
  };
}

export class DriverStore {
  data: DriverData[] = [];

  page = 1;

  total = 0;

  limitPerPage = 10;

  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchDrivers() {
    this.isFetching = true;

    try {
      const response = await api.get<Driver[]>('drivers', {
        params: {
          _page: this.page,
          _limit: this.limitPerPage,
        },
      });

      const parsedDrivers = response.data.map(parseDriver);

      runInAction(() => {
        this.data = parsedDrivers;
        this.total = Number(response.headers['x-total-count']);
      });
    } catch {
      message.error('Erro ao buscar motoristas');
    } finally {
      runInAction(() => {
        this.isFetching = false;
      });
    }
  }
}

export const driverStore = new DriverStore();
