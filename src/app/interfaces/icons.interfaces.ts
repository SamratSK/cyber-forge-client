export interface SvgJson {
  attributes: { [key: string]: string };
  children?: SvgJsonChild[];
}

export interface SvgJsonChild {
  tag: string;
  attributes: { [key: string]: string };
  children?: SvgJsonChild[];
}