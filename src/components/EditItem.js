import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import styled from 'styled-components';

class EditItem extends Component {
  static defaultProps = {
    category: '',
    price: '',
    notes: '',
    quantity: '1.0',
    units: 'units'
  }

  state = {
    id: this.props.id,
    category: this.props.category,
    price: this.props.price,
    notes: this.props.notes,
    quantity: this.props.quantity,
    units: this.props.units
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
        <h1>{ this.state.id }</h1>
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
            className="button"
            onClick={ () => this.props.saveItem(this.state) }
          >
            Save
          </Button>
          <Button
            className="button"
            onClick={ () => this.props.deleteItem(this.props.id) }
          >
            Delete
          </Button>
        </div>
      </Paper>
    );
  }
}

export default styled(EditItem)`
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
