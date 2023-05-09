import React from 'react'
interface Props {
  address: {
    street: string
  }
}
const Title = (props: Props) => {
  const { address } = props
  console.log('title')
  return (
    <div>
      <h2>To do list</h2>
    </div>
  )
}


export default React.memo(Title)
