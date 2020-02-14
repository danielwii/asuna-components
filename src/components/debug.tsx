import { Button, Divider, Icon, Popover } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import JSONTree from 'react-json-tree';
import * as util from 'util';

export const WithDebugInfo: React.FC<{ info: any; debug?: boolean }> = ({ info, debug, children }) => {
  if (debug) {
    return (
      <>
        {children}
        <Popover content={<pre>{util.inspect(info, { depth: 5 })}</pre>} trigger={'click'}>
          <Icon type="info-circle" style={{ margin: '0 0.2rem' }} />
        </Popover>
      </>
    );
  }
  return <>{children}</>;
};

export const DebugInfo: React.FC<{
  data: any;
  divider?: boolean;
  type?: 'json' | 'util' | 'tree';
  debug?: boolean;
}> = ({ data, divider, type, debug }) => {
  const [lv, setLevel] = useState(3);

  if (!debug) {
    return null;
  }

  const rendered = (type => {
    switch (type) {
      case 'json':
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
      case 'util':
        return <pre>{util.inspect(data)}</pre>;
      default:
        return (
          <>
            <Button type="dashed" size="small" onClick={() => setLevel(lv + 1)} children="+" />{' '}
            <Button type="dashed" size="small" onClick={() => setLevel(lv - 1)} children="-" />
            <JSONTree data={data} hideRoot shouldExpandNode={(keyPath, data, level) => level < lv} />
          </>
        );
    }
  })(type);

  return (
    <>
      {divider && <Divider type="horizontal" style={{ margin: '1rem 0' }} />}
      {rendered}
    </>
  );
};
