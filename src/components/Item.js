import React from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import Button from 'material-ui/Button';

const Item = props => {
  const {category, price, quantity, units, notes, id, deleteItem} = props;
  return (
    <Paper className={ props.className }>
      { category } { price } { quantity } { units } { notes }
      <Button onClick={ () => { deleteItem(id) } }>Delete</Button>
    </Paper>
  );
}

export default styled(Item)`
  padding: .5em;
  width: 90vw;
  margin: 1em auto;
`;
