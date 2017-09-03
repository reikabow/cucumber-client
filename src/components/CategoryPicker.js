// @flow

import React, { Component } from 'react';

import { getRoot, getChildren } from '../lib/api';

import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import type { Category } from '../lib/api';

type Props = {};
type State = {
  path: Array<Category>,
  children: Array<Category>,
  filtered: Array<Category>,
  search: string
};

class CategoryPicker extends Component<Props, State> {
  state = {
    path: [],
    children: [{name: 'hi', id: 1}, {name: 'hitmonchan', id: 5}, {name: 'cool', id: 2}, {name: 'whatever', id: 3}],
    filtered: [],
    search: ''
  }

  setFiltered = (): void => {
    const { search, children } = this.state;
    const filtered = children.filter(c => {
      const name = c.name.toLowerCase();
      const s = search.toLowerCase();
      return name.indexOf(s) === 0;
    });
    this.setState({ filtered });
  }

  onKeyDown = (e: SyntheticKeyboardEvent<>) => {
    if (e.key == 'Enter') {
      const { search, children } = this.state;
      if (children.findIndex(({ name }) => name === search))
        return;
      this.setState({ children: [...children, { name: search, id: -1 }] })
    }
  }

  onChange = (e: SyntheticInputEvent<>) => {
    this.setState({ search: e.target.value }, this.setFiltered);
  }

  onSelect = (category: Category) => {
    this.setState({ path: [...this.state.path, category ]});
  }

  async _componentDidMount() {
    const root = await getRoot();
    const children = await getChildren(root);
    // this.setState({ children });
  }

  componentDidMount() {
    this._componentDidMount();
  }

  render() {
    return (
      <div>
        {
          this.state.path.length > 0 &&
          this.state.path.map(e => <span key={ e.id }>{ e.name } -></span>)
        }
        <Input
          value={ this.state.search }
          onChange={ this.onChange }
          onKeyDown={ this.onKeyDown }
        />
        <Paper>
        {
          this.state.filtered.length > 0 &&
          this.state.filtered.map(c => <div key={ c.id }><Button onClick={ () => this.onSelect(c) }>{ c.name },</Button><br/></div>)
        }
        </Paper>
      </div>
    );
  }
};

export default CategoryPicker;
