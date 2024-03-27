export type UserResult = {
  results: User[];
  info: Info;
};

type Info = {
  seed: string;
  results: number;
  page: number;
  version: string;
};

export type User = {
  gender: Gender;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
};

export type Gender = "all" | "male" | "female";

type Name = {
  title: string;
  first: string;
  last: string;
};

type Location = {
  street: string;
  city: string;
  state: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
};

type Coordinates = {
  latitude: string;
  longitude: string;
};

type Timezone = {
  offset: string;
  description: string;
};

type Login = {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
};

type Dob = {
  date: Date;
  age: number;
};

type ID = {
  name: string;
  value: string;
};

type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};
