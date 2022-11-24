import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { Head, Link, createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createPinia } from 'pinia'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import FloatingVue from 'floating-vue'
import vSelect from 'vue-select'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'
import { Ziggy } from './ziggy'
import DefaultLayout from '@/layouts/Default.vue'
import HeroiconsChevronDown20Solid from '~icons/heroicons/chevron-down-20-solid'
import HeroiconsXMark20Solid from '~icons/heroicons/x-mark-20-solid'

import 'floating-vue/dist/style.css'
import 'vue-select/dist/vue-select.css'

const pinia = createPinia()
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'RMS'

vSelect.props.components.default = () => ({
  Deselect: {
    render: () => h(HeroiconsXMark20Solid, {
      class: {
        'ml-3 hover:text-danger-500 text-gray-400 w-4 h-4': true,
      },
    }),
  },
  OpenIndicator: {
    render: () => h(HeroiconsChevronDown20Solid, {
      class: {
        'text-gray-400 w-5 h-5': true,
      },
    }),
  },
})

createInertiaApp({
  title: title => `${title} - ${appName}`,
  // resolve: name => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
  resolve: (name) => {
    const page = resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob('./pages/**/*.vue'),
    )
    page.then((module) => {
      module.default.layout = module.default.layout || DefaultLayout
    })
    return page
  },
  //   setup
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .use(pinia)
      .use(HighchartsVue)
      .use(ZiggyVue, Ziggy)
      .use(FloatingVue, {
        distance: 10,
        themes: {
          tooltip: {
            // reset
            $resetCss: true,
          },
        },
      })

      .component('Link', Link)
      .component('Head', Head)
      .component('VSelect', vSelect)

      .mount(el)
  },
})

// init area
exportingInit(Highcharts)

InertiaProgress.init({
  color: '#3b82f6',
  showSpinner: true,
})
