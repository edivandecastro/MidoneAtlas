import { Router, RouteLocationNormalizedLoaded } from "vue-router";
import { Menu } from "@/models/Menu";
import { FormattedMenu } from "@/models/FormattedMenu";
import { slideUp, slideDown } from "../../utils/helper";

interface Route extends RouteLocationNormalizedLoaded {
  forceActiveMenu?: string;
}

// Setup side menu
const findActiveMenu = (subMenu: Menu[] | undefined, route: Route): boolean => {
  let match = false;

  if (subMenu === undefined)
    return false

  subMenu.forEach((item) => {
    if (
      ((route.forceActiveMenu !== undefined &&
        item.getPageName() === route.forceActiveMenu) ||
        (route.forceActiveMenu === undefined &&
          item.getPageName() === route.name)) &&
      !item.getIgnore()
    ) {
      match = true;
    } else if (!match && item.getSubMenu()) {
      match = findActiveMenu(item.getSubMenu(), route);
    }
  });
  return match;
};

const nestedMenu = (menus: Array<Menu | "divider"> | undefined, route: Route) => {
  if (menus === undefined)
    return [];

  const formattedMenu: Array<FormattedMenu | "divider"> = [];
  menus.forEach((menu) => {
    if (typeof menu !== "string") {
      const menuItem = new FormattedMenu(
        menu.getIcon(),
        menu.getTitle(),
        menu.getPageName(),
        menu.getSubMenu(),
        menu.getIgnore(),
      );
      let active = ((route.forceActiveMenu !== undefined &&
            menuItem.getPageName() === route.forceActiveMenu) ||
          (route.forceActiveMenu === undefined &&
            menuItem.getPageName() === route.name) ||
          (menuItem.getSubMenu() && findActiveMenu(menuItem.getSubMenu(), route))) &&
        !menuItem.getIgnore();

      menuItem.setActive(active);

      if (menuItem.getSubMenu()) {
        menuItem.setActiveDropdown(findActiveMenu(menuItem.getSubMenu(), route));

        // Nested menu
        const subMenu: Array<FormattedMenu> = [];
        nestedMenu(menuItem.getSubMenu(), route).map(
          (menu) => typeof menu !== "string" && subMenu.push(menu)
        );
        menuItem.setSubMenu(subMenu);
      }

      formattedMenu.push(menuItem);
    } else {
      formattedMenu.push(menu);
    }
  });

  return formattedMenu;
};

const linkTo = (menu: FormattedMenu, router: Router) => {
  if (menu.getSubMenu()?.length !== 0) {
    menu.setActiveDropdown(!menu.getActiveDropdown());
  } else {
    if (menu.getPageName !== undefined) {
      router.push({
        name: menu.getPageName(),
      });
    }
  }
};

const enter = (el: HTMLElement) => {
  slideDown(el, 300);
};

const leave = (el: HTMLElement) => {
  slideUp(el, 300);
};

export { nestedMenu, linkTo, enter, leave };
