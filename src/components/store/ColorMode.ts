import { atom } from "recoil";

export const colorMode = atom<"light" | "dark">({
  key: "colorMode", // unique ID (with respect to other atoms/selectors)
  default: "light", // default value (aka initial value)
});
