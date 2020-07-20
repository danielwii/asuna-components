import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Divider, Button } from 'antd';
import { useAsync } from 'react-use';
import 'antd/dist/antd.css';
import { DrawerButton, DrawerButtonProps, Loading, loadingList } from '../src';

const drawerButtonProps: DrawerButtonProps = {
  text: 'Open',
  title: 'Level one',
};

storiesOf('Drawer', module).add('drawer', () => (
  <div style={{ margin: '1rem' }}>
    <Row>
      <Col flex="200px">One-level Drawer</Col>
      <Col flex="auto">
        <DrawerButton type="primary" {...drawerButtonProps} />
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
    <Row>
      <Col flex="200px">Two-level Drawer</Col>
      <Col flex="auto">
        <DrawerButton
          type="primary"
          {...drawerButtonProps}
          render={({ refreshFlag, openChildrenDrawer }) => {
            const { value } = useAsync(async () => {
              const random = Math.floor(Math.random() * 12);
              return random;
            }, [refreshFlag]);
            return (
              <>
                <Loading type={loadingList[value]} />
                <Button type="primary" onClick={() => openChildrenDrawer()}>
                  Two-level drawer
                </Button>
              </>
            );
          }}
          renderChildrenDrawer={({}) => <Loading type={loadingList[Math.floor(Math.random() * 12)]} />}
        />
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
  </div>
));
