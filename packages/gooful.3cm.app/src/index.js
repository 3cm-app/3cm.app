import { ResponsiveManager } from 'construct-ui';
import { Routes, DefaultRoute } from '@/routes.jsx'

import './main.css'

const $root = document.body.querySelector('#app')
m.route.prefix = ''
m.route($root, DefaultRoute, Routes)

ResponsiveManager.initialize({
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 991.98px)',
  lg: '(min-width: 992px) and (max-width: 1199.98px)',
  xl: '(min-width: 1200px)'
})
