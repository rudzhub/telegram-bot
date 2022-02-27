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
    id: '1cB442VJ8YNK51i9eF9Vbn98-HhPuFI1RgSIqBvtthKs',
    name: 'Волонтери Чернівців',
    city: 'Chernivtsi',
    contacts: {
      phone: '+38 (096) 981-71-82',
      address: 'Головна, 41',
      facebook: 'some_facebook',
      telegram: 'some_telegram',
    },
  },
];
