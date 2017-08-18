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
    units: 'units',
  }

  state = {
    id: this.props.id,
    category: this.props.category,
    price: this.props.price,
    notes: this.props.notes,
    quantity: this.props.quantity,
    units: this.props.units,
    errors: []
  }

  isValid = () => {
    const { price, quantity } = this.state;
    const errors = [];
    if (!price || isNaN(price))
      errors.push('Price should be a number');
    if (!quantity || isNaN(quantity))
      errors.push('Quantity should be a number');
    if (errors.length) {
      this.setState({ errors });
      return false;
    } else {
      return true;
    }
  }

  attemptSave = id => {
    if (this.isValid())
      this.props.saveItem(id, this.state);
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
        <div id="errors">
          { this.state.errors.join(', ') }
        </div>
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
            onClick={ () => this.attemptSave(this.props.id, this.state) }
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
