import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';
import React from 'react';
import { AsunaTextArea, StoreProvider } from '../src';
import { RichEditor } from '../src/rich-editor';

import 'braft-editor/dist/index.css';

storiesOf('RichEditor', module).add('default', () => (
  <>
    <div style={{ margin: '1rem' }}>
      <StoreProvider initialState='<p>新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容</p><p></p><p></p><div className="media-wrap image-wrap"><img className="media-wrap image-wrap" src="/uploads/images/fixed/2021/4/66ae92ed_e022_48c9_bbca_98607202c29f.png__news_top.png"/></div><p></p><div className="media-wrap image-wrap"><img className="media-wrap image-wrap" src="/uploads/images/fixed/2021/4/0ac55f22_e230_4f84_b347_477266e8e369.png__news_home.png"/></div><p></p><p></p><p></p><p></p><p></p><p></p><p>新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容</p><p></p><p>新闻内容新闻内容新闻内容新闻内容新闻内容</p>'>
        {(state, setState) => <RichEditor value={state} onChange={(value) => setState(value)} />}
      </StoreProvider>
    </div>
  </>
));
