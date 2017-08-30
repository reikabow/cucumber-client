import React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

const Item = props => {
  const { category_id, price, quantity, units, notes, id, deleteItem, editItem } = props;
  return (
    <Paper className={ props.className }>
      { category_id } ${ price } { quantity } { units } { notes }
      <Button onClick={ () => { deleteItem(id) } }>Delete</Button>
      <Button onClick={ () => { editItem(id) } }>Edit</Button>
    </Paper>
  );
}

export default Item;
