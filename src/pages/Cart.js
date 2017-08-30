import React, { Component } from 'react';
import Item from '../components/Item';
import Button from 'material-ui/Button';
import findIndex from 'lodash/findIndex';
import { buildTree } from '../lib/tree';
import { getRoot, addTransactions } from '../lib/api';

class Cart extends Component {
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

  // Return category path from category string
  // Potential gotchas
  // - not-unique category names
  // - stale categories (multiple clients)
  getCategoryPath(categoryString) {
    try {
      if (categoryString === '') {
        categoryString = 'ROOT';
      }
      let path = [];
      const categories = categoryString.split('/');
      let curr = this.state.categoryTree;
      for (let i = 0; i < categories.length; ++i) {
        let match = curr.find(e => e.name === categories[i]);
        if (!match) {
          break;
        }
        path.push(match);
        curr = match;
      }
      for (let c of path) {
        console.log(c);
      }
      return path;
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }

  // Get the index of a cart item
  getIndex = id => {
    const index = findIndex(this.state.items, item => item.id === id);
    return index;
  }

  //
  // CART HANDLERS
  //

  // Add an item to the cart
  addItem = () => {
    const { items, nextId } = this.state;
    const newItems = [...items, { id: nextId }];
    this.setState({
      items: newItems,
      editActive: true,
      editId: nextId,
      nextId: nextId + 1
    });
  }

  // Delete a cart item
  deleteItem = id => {
    const {items, editId, editActive} = this.state;
    const index = this.getIndex(id);
    const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
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
  editItem = id => {
    this.setState({
      editId: id,
      editActive: true
    });
  }

  // Close the edit window on a cart item, saving the changes
  saveItem = async (id, item) => {
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
  clear = () => {
    this.setState({
      items: [],
      nextId: 0,
      editActive: false,
      editId: null
    });
  }

  // Submit the contents of the cart to the server
  handleSubmit = async () => {
    const { getIdToken } = this.props.auth;
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

  async componentDidMount() {
    const { getIdToken } = this.props.auth;
    const response = await fetch('/api/categories', { headers: {'Authorization': `Bearer ${getIdToken()}`} });
    const categories = await response.json();
    this.setState({ categories });
    this.setState({ categoryTree: buildTree(categories) })
  }

  render() {
    return (
      <div id="Cart" className={ this.props.className }>
        {
          this.state.items.length
          ? this.state.items.map((item, i) =>
              <Item
                edit={ this.state.editId === item.id }
                deleteItem={ this.deleteItem }
                editItem={ this.editItem }
                saveItem={ this.saveItem }
                key={ item.id }
                { ...item }
              />
            )
          : null
        }
        {
          !this.state.editActive &&
          <Button onClick={ this.addItem }>Add item</Button>
        }
        {
          this.state.items.length > 0 && !this.state.editActive &&
          <Button onClick={ this.handleSubmit }>Submit</Button>
        }
      </div>
    );
  }
}

export default Cart;
