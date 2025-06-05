import { Routes, DefaultRoute } from '@/routes.js'

import './main.css'

const $root = document.body.querySelector('#app')
m.route.prefix = ''
m.route($root, DefaultRoute, Routes)
