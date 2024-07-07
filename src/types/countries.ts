export interface Currency {
  name: string;
  symbol: string;
}

export interface RawCountry {
  name: {
    common: string;
  };
  languages?: {
    [key: string]: string;
  };
  currencies?: {
    [key: string]: Currency;
  };
  capital?: string[];
  population?: number;
  flags?: {
    [key: string]: string;
  };
}

export interface Countries {
  name: string;
  languages: string[];
  currencyCode: string[];
  currencies: string[];
  capital: string;
  population: number;
  flag: string;
  favorite: boolean;
}
