import { Icon } from "../base-components/Lucide/Lucide.vue";

export class Menu {
  private icon: Icon;
  private title: string;
  private pageName?: string;
  private subMenu?: Menu[];
  private ignore?: boolean;

  constructor(icon: Icon, title: string, pageName?: string, subMenu?: Menu[], ignore?: boolean) {
    this.icon = icon;
    this.title = title;
    this.pageName = pageName;
    this.subMenu = subMenu;
    this.ignore = ignore;
  }

  public getIcon(): string {
    return this.icon;
  }

  public setIcon(icon: Icon): void {
    this.icon = icon;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getPageName(): string | undefined {
    return this.pageName;
  }

  public setPageName(pageName: string | undefined): void {
    this.pageName = pageName;
  }

  public getSubMenu(): Menu[] | undefined {
    return this.subMenu;
  }

  public setSubMenu(subMenu: Menu[] | undefined): void {
    this.subMenu = subMenu;
  }

  public getIgnore(): boolean | undefined {
    return this.ignore;
  }

  public setIgnore(ignore: boolean | undefined): void {
    this.ignore = ignore;
  }
}
