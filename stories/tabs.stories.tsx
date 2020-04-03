import React from 'react';
import { storiesOf } from '@storybook/react';

import 'antd/dist/antd.css';
import { Tab, TabPaneType } from '../src/components/tabs';

const panes: TabPaneType[] = [
  {
    title: 'Tab 1',
    content: 'Content of Tab 1',
    key: '0',
    subPanes: [
      { key: '0-1', title: 'node1', content: 'Content of TabNode 1' },
      { key: '0-2', title: 'node2', content: 'Content of TabNode 2' },
      { key: '0-3', title: 'node3', content: 'Content of TabNode 3' },
    ],
    closable: true,
  },
  {
    title: 'Tab 2',
    content: 'Content of Tab 2',
    key: '1',
    subPanes: [
      { key: '1-1', title: 'node1', content: 'Content of TabNode 1' },
      { key: '1-2', title: 'node3', content: 'Content of TabNode 3' },
    ],
    closable: true,
  },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '2',
    subPanes: [
      { key: '2-1', title: 'node1', content: 'Content of TabNode 1' },
      { key: '2-2', title: 'node2', content: 'Content of TabNode 2' },
    ],
    closable: true,
  },
];

storiesOf('Tabs', module)
  .add('default', () => (
    <div style={{ margin: '1rem' }}>
      <Tab
        panes={panes}
        activeKey="1"
        onChange={(opts) => {
          console.log(opts);
        }}
        onSubClick={(pane) => console.log('onSubClick', pane)}
        onSubClose={(pane) => console.log('onSubClose', pane)}
      />
    </div>
  ))
  .add('tab-in-tab', () => (
    <Tab
      mode="tab-in-tab"
      panes={panes}
      activeKey="1"
      activeSubKey="1-1"
      onSubClick={(pane) => console.log('onSubClick', pane)}
      onSubClose={(pane) => console.log('onSubClose', pane)}
    />
  ))
  .add('union', () => (
    <Tab
      mode="union"
      panes={panes}
      activeKey="1"
      activeSubKey="1-1"
      onSubClick={(pane) => console.log('onSubClick', pane)}
      onSubClose={(pane) => console.log('onSubClose', pane)}
    />
  ));
