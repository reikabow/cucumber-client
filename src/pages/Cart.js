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
    editId: null
  }

  clear = () => {
    this.setState({
      items: [],
      nextId: 0,
      editActive: false,
      editId: null
    });
  }

  getIndex = id => {
    const index = findIndex(this.state.items, item => item.id === id);
    return index;
  }

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

  editItem = id => {
    this.setState({
      editId: id,
      editActive: true
    });
  }

  saveItem = (id, item) => {
    const {items} = this.state;
    const index = this.getIndex(id);
    const newItems = [...items.slice(0, index), Object.assign({ id }, item), ...items.slice(index + 1)];
    this.setState({
      items: newItems,
      editId: null,
      editActive: false
    });
  }

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
          !this.state.editActive
          ? <Button onClick={ this.addItem }>Add item</Button>
          : null
        }
        {
          this.state.items.length > 0
          ? <Button onClick={ this.handleSubmit }>Submit</Button>
          : null
        }
      </div>
    );
  }
}

export default styled(Cart)`
  text-align: center;
`;
