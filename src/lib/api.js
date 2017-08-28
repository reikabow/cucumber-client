// @flow

import auth from '../auth/Auth';

export type Category = {
  id: number,
  name: string
};

export type Transaction = {
  category: Category,
  price: string,
  quantity: string,
  units: string,
  notes: string,
  id: number
};

const basicHeader = () => ({
  headers: {
    'Authorization': `Bearer ${auth.getIdToken()}`
  }
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
