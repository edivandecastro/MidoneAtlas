import axios from 'axios';
import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

let menus = {menu: []}

await axios.get('https://snapcode.proxy.beeceptor.com/menus')
  .then(response => {
    // Armazena os dados da API no estado do armazenamento de dados reativos
    menus = response.data;
  })
  .catch(error => {
    console.log(error);
  });

const useSideMenuStore = defineStore("sideMenu", {
  state: (): SideMenuState => menus
});

export { useSideMenuStore };
