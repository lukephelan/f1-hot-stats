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

export type F1Constructor = {
  constructorId: number;
  constructorRef: string;
  name: string;
  nationality: string;
  url: string;
};

export type Season = {
  year: number;
  url: string;
};

export type Circuit = {
  circuitId: number;
  circuitRef: string;
  name: string;
  location: string;
  country: string;
  url: string;
};
