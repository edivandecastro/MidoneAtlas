import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Page2 from "../pages/Page2.vue";
import Page3 from "../pages/Page3.vue";
import Page4 from "../pages/Page4.vue";
import ListLocation from "@/pages/ListLocation.vue";
import NewLocation from "@/pages/NewLocation.vue";

const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/",
        name: "main",
        component: ListLocation,
      },
      {
        path: "lista_unidades",
        name: "list-locations",
        component: ListLocation,
      },
      {
        path: "page-2",
        name: "side-menu-page-2",
        component: Page2,
      },
      {
        path: "page-3",
        name: "side-menu-page-3",
        component: Page3,
      },
      {
        path: "page-4",
        name: "side-menu-page-4",
        component: Page4,
      },
      {
        path: "nova_unidade",
        name: "new-location",
        component: NewLocation,
      },
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "page-1",
        name: "simple-menu-page-1",
        component: ListLocation,
      },
      {
        path: "page-2",
        name: "simple-menu-page-2",
        component: Page2,
      },
    ],
  },
  {
    path: "/top-menu",
    component: TopMenu,
    children: [
      {
        path: "page-1",
        name: "top-menu-page-1",
        component: ListLocation,
      },
      {
        path: "page-2",
        name: "top-menu-page-2",
        component: Page2,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
