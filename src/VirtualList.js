import getVisibleItemBounds from './utils/getVisibleItemBounds'
import throttleWithRAF from './utils/throttleWithRAF'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'
import Window from 'vdux/Window'

const setNewBounds = createAction('<VirtualList/>: SET_NEW_BOUNDS')

const VirtualList = (options) => {
  return {
    initialState ({props, local}) {
      return {
        options: {
          container: typeof window !== 'undefined' ? window : undefined,
          ...options
        },
        firstItemIndex: 0,
        lastItemIndex: -1,
        domNode: window,
        actions: {
          setNewBounds: local(setNewBounds)
        }
      }
    },

    * onCreate ({props, state}) {
      const { itemHeight, items, itemBuffer } = props
      yield state.actions.setNewBounds(getVisibleItemBounds(state.domNode, state.options.container, items, itemHeight, itemBuffer))
    },

    // if props change, just assume we have to recalculate
    // * onUpdate (prevProps, {props, state}) {
    //   const { itemHeight, items, itemBuffer } = props
    //   console.log(itemHeight, items, itemBuffer)
    //   yield state.actions.setNewBounds(getVisibleItemBounds(state.domNode, state.options.container, items, itemHeight, itemBuffer))
    // },

    reducer: handleActions({
      [setNewBounds.type]: (state, payload) => ({...state, ...payload})
    }),

    render ({props, state}) {
      const { firstItemIndex, lastItemIndex } = state
      const { items, itemHeight, InnerComponent } = props

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
        <Window onScroll={refreshState} onResize={refreshState}>
          <div id='virtual-list-container'>
            <InnerComponent
              virtual={virtual}
              {...this.props} />
          </div>
        </Window>
      )

      function * refreshState (e) {
        const { itemHeight, items, itemBuffer } = props
        const domNode = document.getElementById('virtual-list-container')
        yield state.actions.setNewBounds(getVisibleItemBounds(domNode, state.options.container, items, itemHeight, itemBuffer))
      }
    }
  }
}

export default VirtualList
