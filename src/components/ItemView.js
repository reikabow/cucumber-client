// @flow

import React from 'react';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import type { Transaction } from '../lib/api';

type Props = {
  transaction: Transaction,
  deleteItem: (id: number) => void,
  editItem: (id: number) => void
};

const Item = (props: Props) => {
  const { transaction, deleteItem, editItem } = props;
  const { id, category_id, price, quantity, units, notes } = transaction;
  return (
    <Paper>
      Category: { category_id }, Price: ${ price }, Quantity: { quantity } { units }, Notes: { notes }
      <Button onClick={ () => { deleteItem(id) } }>Delete</Button>
      <Button onClick={ () => { editItem(id) } }>Edit</Button>
    </Paper>
  );
}

export default Item;
