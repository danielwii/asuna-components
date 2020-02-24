import { Button, Divider, Tabs } from 'antd';
import React from 'react';

export type SubPaneType = { key: string; title: string; content: React.ReactNode };
export type TabPaneType = {
  key: string;
  title: string;
  content: React.ReactNode;
  subPanes: SubPaneType[];
  closable: boolean;
};

export interface ITabProps {
  mode?: // 在 tab 内部创建 sub tabs
  | 'tab-in-tab'
    // 相关联的放到一起
    | 'union'
    // 默认样式
    | 'normal';
  panes: TabPaneType[];

  activeKey: string;
  activeSubKey?: string;
  onChange?: (opts: OnChangeProps) => void;

  onSubClick: (pane: SubPaneType) => void;
  onSubClose: (pane: SubPaneType) => void;
}

type OnChangeProps = { key: string; sub?: SubPaneType; action: 'select' | 'close' };

export const Tab: React.FC<ITabProps> = ({ panes, activeKey, activeSubKey, onChange }) => {
  const funcs = {};

  return (
    <Tabs
      onChange={key => onChange({ key, action: 'select' })}
      activeKey={activeKey}
      type="editable-card"
      onEdit={(targetKey, action) => console.log({ activeKey, targetKey, action })}
    >
      {panes.map(pane => {
        const subPane = activeSubKey ? pane.subPanes.find(subPane => subPane.key === activeSubKey) : null;
        return (
          <Tabs.TabPane
            key={pane.key}
            tab={
              <RenderTabNode
                title={pane.title}
                activeKey={activeSubKey}
                subPanes={pane.subPanes}
                // 点击子 tab
                onClick={selected => onChange({ key: activeKey, sub: selected, action: 'select' })}
                // 点击关闭子 tab
                onClose={selected => onChange({ key: activeKey, sub: selected, action: 'close' })}
              />
            }
            closable={pane.closable}
          >
            {activeSubKey ? subPane?.content : pane.content}
            <pre>{JSON.stringify({ pane, subPane }, null, 2)}</pre>
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

const RenderTabNode: React.FC<{
  title: string;
  activeKey: string;
  subPanes: SubPaneType[];
  onClick: (pane: SubPaneType) => void;
  onClose: (pane: SubPaneType) => void;
}> = ({ title, activeKey, subPanes, onClick, onClose }) => {
  const panes = subPanes.map((pane, index) => (
    <>
      <Button
        size="small"
        type={activeKey === pane.key ? 'default' : 'dashed'}
        key={pane.title}
        onClick={() => onClick(pane)}
      >
        {pane.title}
        <Button size="small" type="link" onClick={() => onClose(pane)}>
          x
        </Button>
      </Button>
      {subPanes.length - 1 !== index && <Divider type="vertical" dashed />}
    </>
  ));
  return (
    <>
      {title} {panes}
    </>
  );
};
