import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface CountryApi {
  id: string;
  name: string;
  locale: string;
  acronym: string;
}

export interface MenuApi {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: MenuApi[];
  ignore?: boolean;
}
