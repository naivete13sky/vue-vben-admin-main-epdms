import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const permission: AppRouteModule = {
  path: '/runoob',
  name: 'Runoob',
  component: LAYOUT,
  redirect: '/runoob/menu1/menu1-1/menu1-1-1',
  meta: {
    orderNo: 2000,
    icon: 'ion:menu-outline',
    title: t('routes.runoob.runoob.runoob'),
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      component: getParentLayout('Menu1Demo'),
      meta: {
        title: 'Menu1',
      },
      redirect: '/runoob/menu1/menu1-1/menu1-1-1',
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          component: getParentLayout('Menu11Demo'),
          meta: {
            title: 'Menu1-1',
          },
          redirect: '/level/menu1/menu1-1/menu1-1-1',
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: () => import('/@/views/demo/runoob/Menu111.vue'),
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: () => import('/@/views/demo/runoob/Menu12.vue'),
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: () => import('/@/views/demo/runoob/Menu2.vue'),
      meta: {
        title: 'Menu2',
        // ignoreKeepAlive: true,
      },
    },
    {
      path: 'DemoFirst',
      name: 'DemoFirst',
      component: () => import('/@/views/demo/runoob/DemoFirst.vue'),
      meta: {
        title: 'routes.runoob.runoob.DemoFirst',
        // ignoreKeepAlive: true,
      },
    },
    {
      path: 'Vue3_start',
      name: 'Vue3_start',
      component: getParentLayout('Vue3_start'),
      meta: {
        title: 'Vue3_start',
      },
      redirect: '/runoob/Vue3_start/createApp',
      children: [
        {
          path: 'createApp',
          name: 'createApp',
          component: () => import('/@/views/demo/runoob/createApp.vue'),
          meta: {
            title: 'createApp',
          },
        },
        {
          path: 'FunctionData',
          name: 'FunctionData',
          component: () => import('/@/views/demo/runoob/FunctionData.vue'),
          meta: {
            title: 'FunctionData',
          },
        },
        {
          path: 'FunctionMethods',
          name: 'FunctionMethods',
          component: () => import('/@/views/demo/runoob/FunctionMethods.vue'),
          meta: {
            title: 'FunctionMethods',
          },
        },
      ],
    },
    {
      path: 'Vue3_Directives',
      name: 'Vue3_Directives',
      component: getParentLayout('Vue3_Directives'),
      meta: {
        title: 'Vue3_Directives',
      },
      redirect: '/runoob/Vue3_Directives/Directives_v-model',
      children: [
        {
          path: 'Directives_v-model',
          name: 'Directives_v-model',
          component: () => import('/@/views/demo/runoob/Directives_v-model.vue'),
          meta: {
            title: 'Directives_v-model',
          },
        },
        {
          path: 'Directives_v-bind',
          name: 'Directives_v-bind',
          component: () => import('/@/views/demo/runoob/Directives_v-bind.vue'),
          meta: {
            title: 'Directives_v-bind',
          },
        },
        {
          path: 'Directives_v-if',
          name: 'Directives_v-if',
          component: () => import('/@/views/demo/runoob/Directives_v-if.vue'),
          meta: {
            title: 'Directives_v-if',
          },
        },
        {
          path: 'Directives_v-for',
          name: 'Directives_v-for',
          component: () => import('/@/views/demo/runoob/Directives_v-for.vue'),
          meta: {
            title: 'Directives_v-for',
          },
        },
        {
          path: 'Directives_v-on',
          name: 'Directives_v-on',
          component: () => import('/@/views/demo/runoob/Directives_v-on.vue'),
          meta: {
            title: 'Directives_v-on',
          },
        },
        {
          path: 'Directives_v-show',
          name: 'Directives_v-show',
          component: () => import('/@/views/demo/runoob/Directives_v-show.vue'),
          meta: {
            title: 'Directives_v-show',
          },
        },

      ],
    },
    {
      path: 'Vue3_Template',
      name: 'Vue3_Template',
      component: getParentLayout('Vue3_Template'),
      meta: {
        title: 'Vue3_Template',
      },
      redirect: '/runoob/Vue3_Template/Template_insert_text',
      children: [
        {
          path: 'Template_insert_text',
          name: 'Template_insert_text',
          component: () => import('/@/views/demo/runoob/Template_insert_text.vue'),
          meta: {
            title: 'Template_insert_text',
          },
        },
        {
          path: 'Template_insert_html',
          name: 'Template_insert_html',
          component: () => import('/@/views/demo/runoob/Template_insert_html.vue'),
          meta: {
            title: 'Template_insert_html',
          },
        },
        {
          path: 'Template_attribute',
          name: 'Template_attribute',
          component: () => import('/@/views/demo/runoob/Template_attribute.vue'),
          meta: {
            title: 'Template_attribute',
          },
        },
        {
          path: 'Template_expression',
          name: 'Template_expression',
          component: () => import('/@/views/demo/runoob/Template_expression.vue'),
          meta: {
            title: 'Template_expression',
          },
        },
        {
          path: 'Template_directives',
          name: 'Template_directives',
          component: () => import('/@/views/demo/runoob/Template_directives.vue'),
          meta: {
            title: 'Template_directives',
          },
        },
        {
          path: 'Template_parameter',
          name: 'Template_parameter',
          component: () => import('/@/views/demo/runoob/Template_parameter.vue'),
          meta: {
            title: 'Template_parameter',
          },
        },

      ],
    },
  ],
};

export default permission;
