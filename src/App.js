import React from 'react';
// import { message, Button } from 'antd';
// import Button from 'mui'
// import Button from '@material-ui/core/Button';
// import { Button } from 'antd';
import styled from 'styled-components';
// import SwitchSandbox from './sandbox/SwitchSandbox';
import { Button } from './lib';

const Container = styled.div`
  display: flex;
  margin: 50px;
  & > * {
    margin-left: 20px;
  }
`;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => {
  const info = () => {
    // message.info('This is a normal message');
  };

  return (
    <Container>
      <Button>Hello?</Button>
      {/* <Button type="primary" onClick={info}>
        Display normal message
      </Button> */}
      {/* <Button type="primary" onClick={info}></Button> */}
      {/* <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="dashed">Dashed</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button> */}

      {/* <Button type="primary">
        Contained
      </Button>
      <Button>Outlined</Button>
      <Button type="dashed">
        Dashed
      </Button>
      <Button type="text">
        Text
      </Button>
      <Button type="link">
        Link
      </Button> */}
      {/* <SwitchSandbox /> */}
    </Container>
  );
};
export default App;
