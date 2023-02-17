import { MenuService } from '@/services/MenuService'
import { baseUrl } from '@/services/Api';
import { defineStore } from "pinia";
import { Menu } from "@/models/Menu"

export interface MenuApi {
  icon: string;
  title: string;
  page_name?: string;
  sub_menu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

let menus: SideMenuState = { menu: [] }

let menuService = new MenuService(baseUrl.atlas_api_v1);

await menuService.getMenus()
  .then(response => {
    response.data.menus.forEach((menu: MenuApi) => {
      menus.menu.push(new Menu(menu.icon, menu.title, menu.page_name))
    });
  })
  .catch(error => {
    console.log(error);
  });

const useSideMenuStore = defineStore("sideMenu", {
  state: (): SideMenuState => menus
});

export { useSideMenuStore };
