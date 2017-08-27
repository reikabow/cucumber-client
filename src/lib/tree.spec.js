import { buildTree } from './tree';

it('should work', () => {
  const rows = [{id: 0, name: 'ROOT'}, {id: 1, parent_id: 0, name: 'a'}, {id: 2, parent_id: 0, name: 'b'}];
  expect(buildTree(rows)).toEqual({id: 0, name: 'ROOT', children: [{id: 1, name: 'a'}, {id: 2, name: 'b'}]})
})

it('should work even more', () => {
  const a = {id: 0, name: 'ROOT'};
  const b = {id: 1, name: 'meat', parent_id: 0};
  const c = {id: 2, name: 'chicken', parent_id: 1};
  const d = {id: 3, name: 'chicken wings', parent_id: 2};
  const e = {id: 4, name: 'buffalo wings', parent_id: 2};
  const f = {id: 5, name: 'wing stop', parent_id: 4};
  const g = {id: 6, name: 'wing zone', parent_id: 4};

  const rows = [a, b, c, d, e, f, g];
  expect(buildTree(rows)).toEqual({
    id: 0, name: 'ROOT', children: [{
      id: 1, name: 'meat', children: [{
        id: 2, name: 'chicken', children: [{
          id: 3, name: 'chicken wings'
        }, {
          id: 4, name: 'buffalo wings', children: [{
            id: 5, name: 'wing stop'
          }, {
            id: 6, name: 'wing zone'
          }]
        }]
      }]
    }]
  })
});
