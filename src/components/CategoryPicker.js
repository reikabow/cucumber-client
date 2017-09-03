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
  newPath: Array<Category>,
  nextNewId: number,
  search: string
};

class CategoryPicker extends Component<Props, State> {
  state = {
    path: [],
    children: [{name: 'hi', id: 1}, {name: 'hitmonchan', id: 5}, {name: 'cool', id: 2}, {name: 'whatever', id: 3}],
    newPath: [],
    filtered: [],
    nextNewId: 0,
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
    console.log(e.key);
    if (e.key === 'Enter') {
      console.log('hi')
      const { search, children } = this.state;
      if (children.findIndex(c => c.name.toLowerCase() === search.toLowerCase()) > -1) {
        return;
      }
      this.setState({ newPath: [...this.state.newPath, { name: search, id: this.state.nextNewId }], search: '', nextNewId: this.state.nextNewId + 1  });
    }
  }

  onChange = (e: SyntheticInputEvent<>) => {
    this.setState({ search: e.target.value }, this.setFiltered);
  }

  onSelect = (category: Category) => {
    this.setState({ search: '', path: [...this.state.path, category ]}, this.setFiltered);
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
        {
          this.state.newPath.length > 0 &&
          this.state.newPath.map(e => <span key={ e.id }>{ e.name } -></span>)
        }
        <div>
          <Input
            style={{ width: '10em' }}
            value={ this.state.search }
            onChange={ this.onChange }
            onKeyDown={ this.onKeyDown }
          />
          <Paper style={{ width: '10em' }}>
          {
            this.state.filtered.length > 0 &&
            this.state.filtered.map(c => <div key={ c.id }><Button style={{ width: '100%' }} onClick={ () => this.onSelect(c) }>{ c.name }</Button><br/></div>)
          }
          </Paper>
        </div>
        <Button>Done</Button>
      </div>
    );
  }
};

export default CategoryPicker;
