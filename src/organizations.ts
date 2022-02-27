export interface Organization {
  name: string;
  tableId: string;
  city: string;
  contacts: {
    phone: string;
    address?: string;
    telegram?: string;
    facebook?: string;
  };
}

export enum Cities {
  Kyiv = 'Kyiv',
  Chernivtsi = 'Chernivtsi',
}

export const organizations: Organization[] = [
  {
    name: 'Kiev 1',
    tableId: '1jUKFYm03vwC67P9mbKhGV8icIMgy5vLNMaCS9EQ0kWk',
    city: Cities.Kyiv,
    contacts: {
      phone: '+3123123',
      address: 'test',
      facebook: '',
    },
  },
  {
    name: 'Test',
    tableId: 'Shit2',
    city: Cities.Chernivtsi,

    contacts: {
      phone: '+380994584994',
      address: 'test',
      telegram: '',
      facebook: '',
    },
  },
  {
    name: 'Kiev 2',
    tableId: 'Shit3',
    city: Cities.Kyiv,
    contacts: {
      phone: '+380994584994',
      address: 'test',
      facebook: '',
    },
  },
];
