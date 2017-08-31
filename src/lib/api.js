// @flow

import auth from '../auth/Auth';

export type Category = {
  id: number,
  name: string
};

export type Transaction = {
  id: number, // used to order transactions in a cart
  category_id: ?number, // id of the current matched category
  categoryString: string, // the representation of the category path as a string
  price: string,
  quantity: string,
  units: string,
  notes: string
};

const basicHeader = () => ({
  headers: {
    'Authorization': `Bearer ${auth.getIdToken()}`
  }
});

export const newTransaction = (id: number): Transaction => ({
  id,
  category_id: null,
  categoryString: '',
  price: '',
  quantity: '1',
  units: 'units',
  notes: ''
});

export const getChildren = async (c: Category): Promise<Array<Category>> => {
  const response = await fetch(`/api/children/${c.id}`, basicHeader());
  if (response.status < 600 && response.status >= 500) {
    throw new Error(`getChildren(${c.name}) failed`)
  }
  const data = await response.json();
  return data;
};

export const getRoot = async (): Promise<Category> => {
  const response = await fetch('/api/root', basicHeader());
  if (response.status < 600 && response.status >= 500) {
    throw new Error(`getRoot failed`);
  }
  const data = await response.json();
  return data[0];
};

export const addCategory = async (parent: Category, categoryName: string) => {
  const response = await fetch(`/api/categories/${parent.id}/${categoryName}`, basicHeader());
  if (response.status < 600 && response.status >= 500) {
    throw new Error(`addCategory(${parent.name}, ${categoryName}) failed`);
  }
};

export const addTransactions = async (transactions: Array<Transaction>) => {
  const response = await fetch('/api/transactions', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.getIdToken()}`
    },
    method: 'POST',
    body: JSON.stringify(transactions)
  });
  if (response.status < 600 && response.status >= 500) {
    throw new Error('addTransactions failed');
  }
};
