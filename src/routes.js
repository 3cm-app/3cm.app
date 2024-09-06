import IndexPage from '@/pages/index'
import MaintenancePage from '@/pages/maintenance'
import Splash from '@/components/splash-loader/index'
import Layout from '@/layouts/default'

const $root = document.body.querySelector('#app')

const Routes = {
  '/maintenance': { // for testing
    render: function () {
      return m(Layout, m(MaintenancePage))
    }
  },
  '/loading': { // for testing
    render: function () {
      return m(Layout, m(Splash))
    }
  },
  '/index': {
    onmatch () {
      // Show Loader until the promise has been resolved or rejected.
      m.render($root, m(Layout, m(Splash)))
      return new Promise((resolve/*, reject */) => {
        // Fetch all necessary data here
        resolve()
      }).catch((/* e */) => {
        // In case of server error we can show the maintenance page.
        return m(Layout, MaintenancePage)
      })
    },
    render (vnode) {
      if (typeof vnode.tag === 'function') {
        // If onmatch returns a component or a promise that resolves to a component, comes here.
        return vnode
      }
      return  m(Layout, m(IndexPage))
    }
  }
}

const DefaultRoute = '/index'

export { Routes, DefaultRoute }
