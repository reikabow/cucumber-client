// @flow

import React, { Component } from 'react';

import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import type { Transaction } from '../lib/api';

type Props = {
  transaction: Transaction,
  saveItem: (id: number, transaction: Transaction) => Promise<>, // To satisfy linter
  deleteItem: (id: number) => void
};

type State = {
  transaction: Transaction,
  errors: Array<string>
};

class EditItem extends Component<Props, State> {
  state = {
    transaction: this.props.transaction,
    errors: []
  }

  isValid = (): boolean => {
    const { price, quantity } = this.state.transaction;
    const errors: Array<string> = [];
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

  attemptSave = (id: number) => {
    if (this.isValid())
      this.props.saveItem(id, this.state.transaction);
  }

  onCategoryStringChange = (e: SyntheticInputEvent<>) => {
    const { transaction } = this.state;
    const { target: { value } } = e;
    this.setState({ transaction: Object.assign(transaction, { categoryString: value }) });
  }
  onPriceChange = (e: SyntheticInputEvent<>) => {
    const { transaction } = this.state;
    const { target: { value } } = e;
    this.setState({ transaction: Object.assign(transaction, { price: value }) });
  }
  onNotesChange = (e: SyntheticInputEvent<>) => {
    const { transaction } = this.state;
    const { target: { value } } = e;
    this.setState({ transaction: Object.assign(transaction, { notes: value }) });
  }
  onQuantityChange = (e: SyntheticInputEvent<>) => {
    const { transaction } = this.state;
    const { target: { value } } = e;
    this.setState({ transaction: Object.assign(transaction, { quantity: value }) });
  }
  onUnitsChange = (e: SyntheticInputEvent<>) => {
    const { transaction } = this.state;
    const { target: { value } } = e;
    this.setState({ transaction: Object.assign(transaction, { units: value }) });
  }

  render() {
    const { categoryString, price, notes, quantity, units } = this.state.transaction;
    return (
      <Paper>
        <div id="errors">
          { this.state.errors.join(', ') }
        </div>
        <div id="fields">
          <TextField
            className="tf"
            onChange={ this.onCategoryStringChange }
            label="Category"
            value={ categoryString }
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
          <br/>
          <Button
            className="button"
            onClick={ () => this.attemptSave(this.props.transaction.id) }
          >
            Save
          </Button>
          <Button
            className="button"
            onClick={ () => this.props.deleteItem(this.props.transaction.id) }
          >
            Delete
          </Button>
        </div>
      </Paper>
    );
  }
}

export default EditItem;
