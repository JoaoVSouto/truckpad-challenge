export type CNHDocument = {
  expires_at: string;
  country: string;
  number: string;
  doc_type: 'CNH';
  category: string;
};

type CPFDocument = {
  country: string;
  number: string;
  doc_type: 'CPF';
};

type Addresses = {
  name: string;
  state: string;
  country: string;
  neighborhood: string;
  city: string;
  street_number?: number;
  complement?: string;
  postal_code: string;
  street_name: string;
};

export type Driver = {
  id: number;
  name: string;
  birth_date: string;
  state: string;
  city: string;
  addresses: Addresses;
  documents: (CNHDocument | CPFDocument)[];
};
