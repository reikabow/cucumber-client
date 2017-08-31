// @flow

import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Item from '../components/Item';

import findIndex from 'lodash/findIndex';

import { newTransaction, getRoot, addTransactions } from '../lib/api';
import { buildTree } from '../lib/tree';

import type { Transaction } from '../lib/api';
import type { Category } from '../lib/api';

type Props = {};
type State = {
  items: Array<Transaction>,
  nextId: number,
  editActive: boolean,
  editId: ?number,
  categories: Array<Category>,
  categoryTree: null
}

class Cart extends Component<Props, State> {
  state = {
    items: [],
    nextId: 0,
    editActive: false,
    editId: null,
    categories: [],
    newCategories: [],
    categoryTree: null
  }

  //
  // UTILITIES
  //

  // Get the index of a cart item
  getIndex = (id: number): number => {
    const index = findIndex(this.state.items, item => item.id === id);
    return index;
  }

  //
  // CART HANDLERS
  //

  // Add an item to the cart
  addItem = (): void => {
    const { items, nextId } = this.state;
    const newItems: Array<Transaction> = [...items, newTransaction(nextId)];
    this.setState({
      items: newItems,
      editActive: true,
      editId: nextId,
      nextId: nextId + 1
    });
  }

  // Delete a cart item
  deleteItem = (id : number): void => {
    const { items, editId, editActive } = this.state;
    const index = this.getIndex(id);
    const newItems: Array<Transaction> = [...items.slice(0, index), ...items.slice(index + 1)];
    if (editActive && editId === id) { // The editing window is being deleted
      this.setState({
        items: newItems,
        editActive: false,
        editId: null
      });
    } else {
      this.setState({
        items: newItems
      });
    }
  }

  // Activate the edit window on a cart item
  editItem = (id: number): void => {
    this.setState({
      editId: id,
      editActive: true
    });
  }

  // Close the edit window on a cart item, saving the changes
  saveItem = async (id: number, item: Transaction) => {
    // TODO: Add category to transaction derived from categoryString
    const category = await getRoot();
    const category_id = category.id;
    const { items } = this.state;
    const index = this.getIndex(id);

    const newItems = [...items.slice(0, index), Object.assign(item, { category_id, id }), ...items.slice(index + 1)];
    this.setState({
      items: newItems,
      editId: null,
      editActive: false
    });
  }

  // Clear the cart
  clear = (): void => {
    this.setState({
      items: [],
      nextId: 0,
      editActive: false,
      editId: null
    });
  }

  // Submit the contents of the cart to the server
  handleSubmit = async () => {
    try {
      addTransactions(this.state.items);
      this.clear();
    } catch (err) {
      // TODO: Handle errors better
      alert(`Submission error: ${err.message}`);
    }
  }

  //
  // REACT
  //

  // https://github.com/facebook/flow/issues/1803
  async _componentDidMount() {
    const { getIdToken } = this.props.auth;
    const response: Response = await fetch('/api/categories', { headers: {'Authorization': `Bearer ${getIdToken()}`} });
    const categories: Array<Category> = await response.json();
    this.setState({ categories });
    this.setState({ categoryTree: buildTree(categories) })
  }

  componentDidMount() {
    this._componentDidMount();
  }

  render() {
    const { items, editActive } = this.state;
    return (
      <div id="Cart">
        { items.length > 0 &&
          items.map(item =>
            <Item
              key={ item.id }
              editActive={ this.state.editId === item.id }
              deleteItem={ this.deleteItem }
              editItem={ this.editItem }
              saveItem={ this.saveItem }
              transaction={ item }
            />
          ) }
        { !editActive &&
          <Button onClick={ this.addItem }>Add item</Button> }
        { items.length > 0 && !editActive &&
          <Button onClick={ this.handleSubmit }>Submit</Button> }
      </div>
    );
  }
}

export default Cart;
