// @flow
// Focus/Blur article https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b

import React, { Component } from 'react';

import { getRoot, getChildren, addCategories } from '../lib/api';

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
  focused: boolean,
  search: string
};

class CategoryPicker extends Component<Props, State> {
  _timeoutID: ?number;

  state = {
    path: [],
    children: [{name: 'hi', id: 1}, {name: 'hitmonchan', id: 5}, {name: 'cool', id: 2}, {name: 'whatever', id: 3}],
    newPath: [],
    filtered: [],
    nextNewId: 0,
    focused: false,
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
    if (e.key === 'Enter') {
      const { search, children } = this.state;
      if (children.findIndex(c => c.name.toLowerCase() === search.toLowerCase()) > -1) {
        return;
      }
      if (search.length === 0) {
        return;
      }
      this.setState({ newPath: [...this.state.newPath, { name: search, id: this.state.nextNewId }], search: '', nextNewId: this.state.nextNewId + 1  });
    }
  }

  onChange = (e: SyntheticInputEvent<>) => {
    this.setState({ search: e.target.value }, this.setFiltered);
  }

  onSelect = async (category: Category) => {
    const children = await getChildren(category)
    this.setState({ search: '', path: [...this.state.path, category ], children}, this.setFiltered);
    this.input.focus();
  }

  handleDone = async () => {
    if (this.state.newPath.length === 0) {
      return;
    }
    if (this.state.path.length === 0 && this.state.newPath.length === 0) {
      return;
    }
    console.log(this.state);
    if (this.state.path.length === 0) {
      const root = await getRoot();
      addCategories(root, this.state.newPath);
    } else {
      const parent = this.state.path[this.state.path.length - 1];
      addCategories(parent, this.state.newPath);
    }

    const root = await getRoot();
    const children = await getChildren(root);

    this.setState({
      search: '',
      newPath: [],
      filtered: children,
      path: [],
      children
    });
  }

  onBlur = () => {
    this._timeoutID = setTimeout(() => {
      if (this.state.focused) {
        this.setState({ focused: false });
      }
    }, 0)
  };

  onFocus = () => {
    clearTimeout(this._timeoutID);
    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  }

  async _componentDidMount() {
    const root = await getRoot();
    const children = await getChildren(root);
    this.setState({ children, filtered: children });
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
        <div
          onFocus={ this.onFocus }
          onBlur={ this.onBlur }
        >
          <Input
            style={{ width: '10em' }}
            value={ this.state.search }
            inputRef={ input => this.input = input }
            onChange={ this.onChange }
            onKeyDown={ this.onKeyDown }
          />
          <Paper style={{ width: '10em' }}>
          {
            this.state.focused &&
            this.state.filtered.length > 0 &&
            this.state.filtered.map(c => <div key={ c.id }><Button style={{ width: '100%' }} onClick={ () => this.onSelect(c) }>{ c.name }</Button><br/></div>)
          }
          </Paper>
        </div>
        <Button onClick={ this.handleDone }>Done</Button>
      </div>
    );
  }
};

export default CategoryPicker;
