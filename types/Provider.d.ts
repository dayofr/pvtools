interface Provider {
  provider: string;
  full: number;
  low: number;
  standard: number;
  aFullLow: number;
  aStandard: number;
}

type CompareProviderFunction = (p: Provider) => void;
