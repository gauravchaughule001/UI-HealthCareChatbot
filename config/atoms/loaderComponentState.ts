import { atom } from "recoil";

export const loaderComponentState = atom<boolean>({
  key: "loaderComponentState",
  default: false,
});
