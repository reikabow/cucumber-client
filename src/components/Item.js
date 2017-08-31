// @flow

import React from 'react';

import EditItem from './EditItem';
import ItemView from './ItemView';

import type { Transaction } from '../lib/api';

type Props = {
  editActive: boolean,
  deleteItem: (id: number) => void,
  editItem: (id: number) => void,
  saveItem: (id: number, item: Transaction) => Promise<>, // To satisfy linter
  transaction: Transaction
};

const Item = (props: Props) => {
  if (props.editActive)
    return <EditItem { ...props }/>;
  else
    return <ItemView { ...props }/>
}

export default Item;
