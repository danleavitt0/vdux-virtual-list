import VirtualList from '../../src/VirtualList'
import element from 'vdux/element'

const Example = (MyList) => {
  return {
    render () {
      const itemHeight = 50
      const itemBuffer = 50
      let items = []
      for (let i = 0; i < 2000; i++) {
        items.push({text: i})
      }
      const MyVirtualList = VirtualList({container: window})
      return (
        <div>
					start of list
					<div>
  <MyVirtualList
    itemHeight={itemHeight}
    itemBuffer={itemBuffer}
    InnerComponent={MyList}
    items={items} />
					</div>
        </div>
      )
    }
  }
}

export default Example
