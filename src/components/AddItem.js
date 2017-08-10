import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import styled from 'styled-components';

class AddItem extends Component {
  state = {
    category: '',
    price: '',
    notes: '',
    quantity: '1.0',
    units: 'units'
  }

  onCategoryChange = e => this.setState({category: e.target.value});
  onPriceChange = e => this.setState({price: e.target.value});
  onNotesChange = e => this.setState({notes: e.target.value});
  onQuantityChange = e => this.setState({quantity: e.target.value});
  onUnitsChange = e => this.setState({units: e.target.value});

  render() {
    const {category, price, notes, quantity, units} = this.state;
    return (
      <Paper className={ this.props.className }>

        <div id="fields">
          <TextField
            className="tf"
            onChange={ this.onCategoryChange }
            label="Category"
            value={ category }
          />
          <TextField
            onChange={ this.onPriceChange }
            className="tf"
            label="Price"
            value={ price }
          />
          <TextField
            onChange={ this.onNotesChange }
            className="tf"
            label="Notes"
            value={ notes }
          />
          <TextField
            onChange={ this.onQuantityChange }
            className="tf"
            label="Quantity"
            value={ quantity }
          />
          <TextField
            onChange={ this.onUnitsChange }
            className="tf"
            label="Units"
            value={ units }
          />
          <Button
            id="button"
            onClick={ () => this.props.addItem(this.state) }
          >
            Add
          </Button>
        </div>
      </Paper>
    );
  }
}

export default styled(AddItem)`
  width: 90vw;
  margin: 1em auto;
  padding: 0.5em;
  #fields {
    width: 90%;
    margin: 1em auto;
    text-align: center;
  }
  .tf {
    margin: 0.5em 1em;
  }
  #button {
    margin: 0.5em 1em;
  }
`;
