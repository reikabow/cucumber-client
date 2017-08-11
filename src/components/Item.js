import React from 'react';

import EditItem from './EditItem';
import ItemView from './ItemView';

const Item = props => {
  if (props.edit)
    return <EditItem { ...props }/>;
  else
    return <ItemView { ...props }/>
}

export default Item;
