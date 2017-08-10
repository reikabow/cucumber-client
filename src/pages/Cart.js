import React, { Component } from 'react';
import AddItem from '../components/AddItem';
import Item from '../components/Item';
import AddOrItem from '../components/AddOrItem';
import Button from 'material-ui/Button';
import styled from 'styled-components';

class Cart extends Component {
  state = {
    items: [],
    showAdd: true,
    addIndex: null
  }

  saveItem = item => {
    const {items, addIndex} = this.state;
    this.setState({
      items: [...items.splice(0, addIndex), item, ...items.splice(addIndex + 1)],
      addIndex: null,
      showAdd: true
    });
  }

  addItem = () => {
    const items = [...this.state.items, null];
    this.setState({
      items,
      showAdd: false,
      addIndex: items.length - 1
    });
  }

  activateAdd = addIndex => {
    this.setState({ showAdd: true, addIndex })
  }

  render() {
    return (
      <div id="Cart" className={ this.props.className }>
        {
          this.state.items.length
          ? this.state.items.map((item, i) =>
              <AddOrItem
                addActive={ i === this.state.addIndex }
                saveItem={ this.saveItem }
                key={ i }
                { ...item }
              />
            )
          : null
        }
        {
          this.state.showAdd
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
