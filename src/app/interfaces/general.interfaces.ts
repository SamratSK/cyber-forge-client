import { SvgJson } from "./icons.interfaces";

export interface MenuItem {
  icon?: SvgJson
  name: string;
  action: () => void;
  children?: MenuItem[]
}