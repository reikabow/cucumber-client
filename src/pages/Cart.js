import React, { Component } from 'react';
import AddItem from '../components/AddItem';
import Item from '../components/Item';
import Button from 'material-ui/Button';
import styled from 'styled-components';

class Cart extends Component {
  state = {
    items: []
  }

  addItem = item => {
    this.setState({items: [...this.state.items, item]});
  }

  render() {
    return (
      <div id="Cart" className={ this.props.className }>
        <AddItem addItem={ this.addItem }/>
        {
          this.state.items.length
          ? this.state.items.map((item, i) => <Item key={ i } { ...item }/>)
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
