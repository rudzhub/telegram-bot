export interface Organization {
  id: string;
  name: string;
  city: string;
  contacts: {
    phone: string;
    address?: string;
    telegram?: string;
    facebook?: string;
  };
}

export const orgs: Organization[] = [
  {
    id: '1jUKFYm03vwC67P9mbKhGV8icIMgy5vLNMaCS9EQ0kWk',
    name: 'Народное содружество',
    city: 'Kyiv',
    contacts: {
      phone: '+38 (088) 888-88-88',
      address: 'st. some_facebook',
      facebook: 'some_facebook',
      telegram: 'some_telegram',
    },
  },
];
