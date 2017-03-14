/**
 * Imports
 */

import 'regenerator-runtime/runtime'
import vdux from 'vdux/dom'
import {element} from 'vdux'
import App from './app'

/**
 * Hot module replacement
 */

const {forceRerender} = vdux(() => <App />)

if (module.hot) {
  module.hot.accept(['./app'], () => {
    require('./app').default
    forceRerender()
  })
}

