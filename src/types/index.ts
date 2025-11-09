export type UserType = 'admin' | 'client' | 'provider';

export interface User {
  id: string;
  email: string;
  fullName: string;
  company?: string;
  phone: string;
  userType: UserType;
  createdAt: Date;
}

export interface Quote {
  id: string;
  userId: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  aircraftType: string;
  passengers: number;
  services: {
    fuel: boolean;
    handling: boolean;
    catering: boolean;
    transport: boolean;
    vipLounge: boolean;
  };
  additionalInfo?: string;
  status: 'pending' | 'quoted' | 'accepted' | 'completed';
  createdAt: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}
