import {component, element} from 'vdux'
import Example from './Example'

const MyList = ({
	props
}) => (
  <ul style={{...props.virtual.style, boxSizing: 'border-box'}}>
    {props.virtual.items.map((item, i) => (
      <li style={{display: 'block', height: 50}}>Test {item.text}</li>
		))}
  </ul>
)

const ConfiguredExample = Example(MyList)

export default component({
	render ({props}) {
	  return (
	    <div><ConfiguredExample /></div>
	  )
	}
})
