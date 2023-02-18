import { Menu } from '@/models/Menu';
import { Icon } from "../base-components/Lucide/Lucide.vue";

export class FormattedMenu extends Menu {
  private active?: boolean;
  private activeDropdown?: boolean;

  constructor(
    icon: Icon,
    title: string,
    pageName?: string,
    subMenu?: Menu[] | FormattedMenu[],
    ignore?: boolean,
    active?: boolean,
    activeDropdown?: boolean) {
      super(icon, title, pageName, subMenu, ignore);
      this.active = active;
      this.activeDropdown = activeDropdown;
  }

  public getActive(): boolean | undefined {
    return this.active;
  }

  public setActive(active: boolean | undefined) {
    this.active = active;
  }

  public getActiveDropdown(): boolean | undefined {
    return this.activeDropdown;
  }

  public setActiveDropdown(activeDropdown: boolean) {
    this.activeDropdown = activeDropdown;
  }
}
