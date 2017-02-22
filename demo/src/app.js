import element from 'vdux/element'
import Example from './Example'

const MyList = ({
	props
}) => (
  <ul style={{...props.virtual.style, boxSizing: 'border-box'}}>
    {props.virtual.items.map((item, i) => (
      <li onClick={(e) => console.log(e)} style={{display: 'block', height: 50}}>Test {item.text}</li>
		))}
  </ul>
)

const ConfiguredExample = Example(MyList)

function render ({props}) {
  return (
    <div><ConfiguredExample /></div>
  )
}

export default render
