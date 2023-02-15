<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Lucide from "../../base-components/Lucide";
import { FormattedMenu, linkTo } from "./top-menu";

interface MenuProps {
  class?: string | object;
  menu: FormattedMenu;
  level: "first" | "second" | "third";
}

const router = useRouter();
const props = defineProps<MenuProps>();
</script>

<template>
  <a
    :href="
    props.menu.subMenu
      ? '#'
      : ((pageName: string | undefined) => {
          try {
            return router.resolve({
              name: pageName,
            }).fullPath;
          } catch (err) {
            return '';
          }
        })(props.menu.pageName)
  "
    :class="[
      'h-[55px] rounded-full xl:rounded-b-none xl:rounded-t-[1rem] flex items-center text-white relative',
      {
        'px-5 mr-1': props.level == 'first',
        'px-0 mr-0': props.level != 'first',

        'z-10 bg-slate-100 dark:bg-darkmode-700':
          props.level == 'first' && props.menu.active,

        'before:content-[\'\'] before:w-[20px] before:h-[20px] before:-ml-[20px] before:rotate-90 before:scale-[1.04] before:bg-[length:100%] before:bg-menu-corner before:absolute before:bottom-0 before:left-0 before:hidden before:xl:block dark:before:bg-menu-corner-dark':
          props.level == 'first' && props.menu.active,
        'after:content-[\'\'] after:w-[20px] after:h-[20px] after:-mr-[20px] after:rotate-180 after:scale-[1.04] after:bg-[length:100%] after:bg-menu-corner after:absolute after:bottom-0 after:right-0 after:hidden after:xl:block dark:after:bg-menu-corner-dark':
          props.level == 'first' && props.menu.active,
      },
      props.class,
    ]"
    @click="(event: MouseEvent) => {
      event.preventDefault();

      linkTo(props.menu, router);
      }"
  >
    <div
      :class="[
        'dark:text-slate-400',
        {
          'text-primary dark:text-white':
            props.level == 'first' && props.menu.active,

          'before:content-[\'\'] before:z-[-1] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:rounded-full xl:before:rounded-b-none xl:before:rounded-t-lg before:transition before:ease-in before:duration-100':
            !props.menu.active,
        },
      ]"
    >
      <Lucide :icon="props.menu.icon" />
    </div>
    <div
      :class="[
        'ml-3 flex items-center whitespace-nowrap dark:text-slate-400',
        {
          'text-black font-medium dark:text-white':
            props.level == 'first' && props.menu.active,
          'w-full': props.level != 'first',
        },
      ]"
    >
      {{ props.menu.title }}
      <Lucide
        v-if="props.menu.subMenu"
        icon="ChevronDown"
        :class="[
          'hidden w-4 h-4 transition duration-100 ease-in xl:block',
          { 'ml-2': props.level == 'first' },
          { 'ml-auto': props.level != 'first' },
        ]"
      />
    </div>
  </a>
</template>
