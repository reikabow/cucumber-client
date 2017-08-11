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

  getIndex = id => {
    const index = findIndex(this.state.items, item => item.id === id);
    return index;
  }

  addItem = () => {
    alert(`add`);
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
    const index = this.getIndex(id);
    alert(`edit ${id} at ${index}`)
    this.setState({
      editId: id,
      editActive: true
    });
  }

  saveItem = item => {
    const {items, editId} = this.state;
    const index = this.getIndex(item.id);
    alert(`save ${item.id} at ${index}`);
    const it = items[index];
    console.log(it);
    this.setState({
      items: [...items.splice(0, index), Object.assign(it, item), ...items.splice(index + 1)],
      editId: null,
      editActive: false
    });
  }

  deleteItem = id => {
    const {items, editId, editActive} = this.state;
    console.log(items);
    const index = this.getIndex(id);
    alert(`delete ${id} at ${index}`);
    if (editActive && editId === id) { // The editing window is being deleted
      this.setState({
        items: [...items.splice(0, index), ...items.splice(index + 1)],
        editActive: false,
        editId: null
      });
    } else {
      this.setState({
        items: [...items.splice(0, index), ...items.splice(index + 1)]
      });
    }
  }

  activateEdit = addIndex => {
    this.setState({ showAdd: true, addIndex })
  }

  render() {
    console.log(this.state.items);
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
          this.state.items.length
          ? <Button>Submit</Button>
          : null
        }
      </div>
    );
  }
}

export default styled(Cart)`
  text-align: center;
`;
