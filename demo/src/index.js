/**
 * Imports
 */

import 'regenerator-runtime/runtime'
import domready from '@f/domready'
import flow from 'redux-flo'
import vdux from 'vdux/dom'

var app = require('./app').default

const initialState = {}

const {subscribe, render, replaceReducer} = vdux({
  reducer: (state) => state,
  initialState,
  middleware: [
    flow()
  ]
})

domready(() => {
  subscribe((state) => {
    return render(app(state))
  })
})

if (module.hot) {
  module.hot.accept(['./app'], () => {
    replaceReducer((state) => state)
    app = require('./app').default
  })
}
