import { Routes, DefaultRoute } from '@/routes.js'

import './main.css'
import '../node_modules/nes.css/css/nes.min.css';
import './index.css'

const $root = document.body.querySelector('#app')
m.route($root, DefaultRoute, Routes)
