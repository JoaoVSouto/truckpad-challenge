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

function mountDriverPayload(driverData: Omit<DriverData, 'id'>) {
  return {
    name: driverData.name,
    birth_date: driverData.birthDate,
    state: driverData.address.state,
    city: driverData.address.city,
    documents: [
      ...(driverData.cnh
        ? [
            {
              country: 'BR',
              expires_at: driverData.cnh.expiresAt,
              number: driverData.cnh.number,
              category: driverData.cnh.category,
              doc_type: 'CNH' as const,
            },
          ]
        : []),
      {
        country: 'BR',
        number: driverData.cpf,
        doc_type: 'CPF',
      },
    ],
    addresses: {
      name: driverData.address.name,
      state: driverData.address.state,
      country: 'BR',
      neighborhood: driverData.address.neighborhood,
      city: driverData.address.city,
      street_number: driverData.address.streetNumber,
      complement: driverData.address.complement,
      postal_code: driverData.address.postalCode,
      street_name: driverData.address.streetName,
    },
  };
}

export class DriverStore {
  data: DriverData[] = [];

  page = 1;

  total = 0;

  limitPerPage = 5;

  isFetching = false;

  isFetchingSilently = false;

  isCreating = false;

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
      message.error('Erro ao buscar motoristas. Por favor, tente novamente.');
    } finally {
      runInAction(() => {
        this.isFetching = false;
      });
    }
  }

  async fetchDriversSilently() {
    this.isFetchingSilently = true;

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
    } finally {
      runInAction(() => {
        this.isFetchingSilently = false;
      });
    }
  }

  createDriver = async (driverData: Omit<DriverData, 'id'>) => {
    const payload = mountDriverPayload(driverData);

    this.isCreating = true;

    try {
      const driverResponse = await api.post('drivers', payload);

      message.success('Motorista criado com sucesso!');

      runInAction(() => {
        this.total += 1;
      });

      if (this.data.length < this.limitPerPage) {
        runInAction(() => {
          this.data.push({
            ...driverData,
            id: driverResponse.data.id,
          });
        });
      }
    } catch {
      message.error('Erro ao criar motorista. Por favor, tente novamente.');
      throw new Error('Unable to create driver');
    } finally {
      runInAction(() => {
        this.isCreating = false;
      });
    }
  };

  deleteDriver = async (driverId: number) => {
    const staleDrivers = this.data;
    this.data = staleDrivers.filter(driver => driver.id !== driverId);
    this.total -= 1;

    try {
      await api.delete(`drivers/${driverId}`);

      runInAction(() => {
        if (this.data.length === 0 && this.page > 1) {
          this.page -= 1;
          this.fetchDrivers();
        } else {
          this.fetchDriversSilently();
        }
      });
    } catch {
      message.error('Erro ao remover motorista. Por favor, tente novamente.');

      runInAction(() => {
        this.data = staleDrivers;
        this.total += 1;
      });
    }
  };

  updateDriver = async (driverData: DriverData) => {
    const payload = mountDriverPayload(driverData);

    this.isCreating = true;

    try {
      await api.put(`drivers/${driverData.id}`, payload);

      message.success('Motorista atualizado com sucesso!');

      runInAction(() => {
        this.data = this.data.map(driver =>
          driver.id === driverData.id ? driverData : driver,
        );
      });
    } catch {
      message.error('Erro ao atualizar motorista. Por favor, tente novamente.');
      throw new Error('Unable to update driver');
    } finally {
      runInAction(() => {
        this.isCreating = false;
      });
    }
  };

  changePage(page: number, limitPerPage?: number) {
    this.page = page;

    if (limitPerPage) {
      this.limitPerPage = limitPerPage;
    }

    this.fetchDrivers();
  }
}

export const driverStore = new DriverStore();
