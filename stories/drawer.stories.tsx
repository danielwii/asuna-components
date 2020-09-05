import { storiesOf } from '@storybook/react';
import { Button, Col, Divider, Row } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { useAsync } from 'react-use';

import { DrawerButton, DrawerButtonProps } from '../src';

const drawerButtonProps: DrawerButtonProps = {
  text: 'Open',
  title: 'Level one',
};

const poems = [
  {
    title: 'Stopping by Woods on a Snowy Evening',
    content:
      'Whose woods these are I think I know.<br />His house is in the village though;   <br />He will not see me stopping here   <br />To watch his woods fill up with snow.   <br /><br />My little horse must think it queer   <br />To stop without a farmhouse near   <br />Between the woods and frozen lake   <br />The darkest evening of the year.   <br /><br />He gives his harness bells a shake   <br />To ask if there is some mistake.   <br />The only other sound’s the sweep   <br />Of easy wind and downy flake.   <br /><br />The woods are lovely, dark and deep,   <br />But I have promises to keep,   <br />And miles to go before I sleep,   <br />And miles to go before I sleep.',
  },
  {
    title: 'Sonnet 18',
    content: `Shall I compare thee to a summer's day? <br />Thou art more lovely and more temperate: <br />Rough winds do shake the darling buds of May, <br />And summer's lease hath all too short a date: <br />Sometime too hot the eye of heaven shines, <br />And often is his gold complexion dimmed, <br />And every fair from fair sometime declines, <br />By chance or nature's changing course untrimmed: <br />But thy eternal summer shall not fade, <br />Nor lose possession of that fair thou ow'st, <br />Nor shall death brag thou wand'rest in his shade, <br />When in eternal lines to time thou grow’st: <br />So long as men can breathe or eyes can see, <br />So long lives this, and this gives life to thee.`,
  },
];

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
                <p>The random number is {value}</p>
                {poems.map((item, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <h3>{item.title}</h3>
                      <Button type="primary" onClick={() => openChildrenDrawer(item)}>
                        Show content
                      </Button>
                    </React.Fragment>
                  );
                })}
              </>
            );
          }}
          renderChildrenDrawer={({ item }) => (
            <>
              <h3>{item.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </>
          )}
        />
      </Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
  </div>
));
