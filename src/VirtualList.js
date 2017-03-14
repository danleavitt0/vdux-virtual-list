import getVisibleItemBounds from './utils/getVisibleItemBounds'
import throttleWithRAF from './utils/throttleWithRAF'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {component, element, Window} from 'vdux'

const VirtualList = (options) => component({
  initialState ({props}) {
    return {
      options: {
        container: typeof window !== 'undefined' ? window : undefined,
        ...options
      },
      firstItemIndex: 0,
      lastItemIndex: -1,
      domNode: window
    }
  },

  * onCreate ({props, state, actions}) {
    const { itemHeight, items, itemBuffer } = props
    console.log(getVisibleItemBounds(state.domNode, state.options.container, items, itemHeight, itemBuffer))
    yield actions.setNewBounds(getVisibleItemBounds(state.domNode, state.options.container, items, itemHeight, itemBuffer))
  },

  // if props change, just assume we have to recalculate
  // * onUpdate (prevProps, {props, state}) {
  //   const { itemHeight, items, itemBuffer } = props
  //   console.log(itemHeight, items, itemBuffer)
  //   yield state.actions.setNewBounds(getVisibleItemBounds(state.domNode, state.options.container, items, itemHeight, itemBuffer))
  // },

  reducer: {
    setNewBounds: (state, payload) => {console.log(payload); return ({...payload})}
  },

  render ({props, state, actions, context}) {
    const { firstItemIndex, lastItemIndex } = state
    const { items, itemHeight, InnerComponent } = props

    console.log(firstItemIndex, lastItemIndex)

    const visibleItems = lastItemIndex > -1 ? items.slice(firstItemIndex, lastItemIndex + 1) : []

    // would be nice to make this not break shallowCompare with items.slice
    // but theoretically we're only rendering if we need to

    // style
    const height = items.length * itemHeight
    const paddingTop = firstItemIndex * itemHeight

    const virtual = {
      items: visibleItems,
      style: {
        height,
        paddingTop,
        maxHeight: height,
        boxSizing: 'border-box'
      }
    }

    return (
      <Window onScroll={actions.refreshState()} onResize={actions.refreshState()}>
        <div id='virtual-list-container'>
          <InnerComponent
            virtual={virtual}
            {...this.props} />
        </div>
      </Window>
    )
  },

  controller: {
    * refreshState ({props, actions, state}) {
      const { itemHeight, items, itemBuffer } = props
      const domNode = document.getElementById('virtual-list-container')
      console.log(getVisibleItemBounds(domNode, state.options.container, items, itemHeight, itemBuffer))
      yield actions.setNewBounds(getVisibleItemBounds(domNode, state.options.container, items, itemHeight, itemBuffer))
    }
  }
})

export default VirtualList
