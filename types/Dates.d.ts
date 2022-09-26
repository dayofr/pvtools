interface CompareDates {
  start1: { h: number; m: number };
  end1: { h: number; m: number };
  start2: { h: number; m: number };
  end2: { h: number; m: number };
}

type CompareDatesFunction = (dates: CompareDates) => void;
