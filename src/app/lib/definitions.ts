export type Driver = {
  driverId: number;
  driverRef: string;
  number: number | null;
  code: string;
  name: string;
  dob: string;
  nationality: string;
  url: string;
};

export type Constructor = {
  constructorId: number;
  constructorRef: string;
  name: string;
  nationality: string;
  url: string;
};
