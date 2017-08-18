import React, { Component } from 'react';
import Item from '../components/Item';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import findIndex from 'lodash/findIndex';

class Cart extends Component {
  state = {
    items: [],
    nextId: 0,
    editActive: false,
    editId: null,
    categories: []
  }

  //
  // UTILITIES
  //

  // Return category objects from category string
  // Potential gotchas
  // - not-unique category names
  // - stale categories (multiple clients)
  getCategory(categoryString) {
    try {
      if (categoryString === '') {
        categoryString = 'ROOT';
      }
      const categories = categoryString.split('/');
      const search = categories[categories.length - 1];
      const category = this.state.categories.find(c => c.name === search);
      if (!category) {
        throw new Error('Unknown category');
      }
      return category;
      // TODO: adding new categories
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
  saveItem = (id, item) => {
    item.category_id = this.getCategory(item.category).id;

    const {items} = this.state;
    const index = this.getIndex(id);
    const newItems = [...items.slice(0, index), Object.assign({ id }, item), ...items.slice(index + 1)];
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
      const res = await fetch('/api/transactions', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getIdToken()}`
        },
        method: 'POST',
        body: JSON.stringify(this.state.items)
      });
      if (res.status < 600 && res.status >= 500)
        throw new Error('Bad status');
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
    console.log(categories);
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

export default styled(Cart)`
  text-align: center;
`;
