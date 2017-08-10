import React from 'react';

import AddItem from './AddItem';
import Item from './Item';

const AddOrItem = props => {
  if (props.addActive)
    return <AddItem { ...props }/>;
  else
    return <Item { ...props }/>
}

export default AddOrItem;
