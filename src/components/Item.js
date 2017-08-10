import React from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';

const Item = props => {
  const {category, price, quantity, units, notes} = props;
  return (
    <Paper className={ props.className }>
      { category } { price } { quantity } { units } { notes }
    </Paper>
  );
}

export default styled(Item)`
  padding: .5em;
  width: 90vw;
  margin: 1em auto;
`;
