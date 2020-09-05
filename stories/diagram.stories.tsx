import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
  DefaultPortModel,
  PathFindingLinkFactory,
  DefaultLabelModel,
  DiagramEngine,
  DagreEngine,
} from '@projectstorm/react-diagrams';
import { storiesOf } from '@storybook/react';
import 'antd/dist/antd.css';
import React from 'react';
import { useMount } from 'react-use';
import styled from '@emotion/styled';
import _ from 'lodash';

interface DemoCanvasWidgetProps {
  color?: string;
  background?: string;
}

const DemoButton = styled.button`
  background: rgb(60, 60, 60);
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  margin: 2px;
  border-radius: 3px;
  &:hover {
    background: rgb(0, 192, 255);
  }
`;

export const Container = styled.div<{ color: string; background: string }>`
  height: 100%;
  background-color: ${(p) => p.background};
  background-size: 50px 50px;
  display: flex;
  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      ${(p) => p.color} 25%,
      ${(p) => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${(p) => p.color} 75%,
      ${(p) => p.color} 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      ${(p) => p.color} 25%,
      ${(p) => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${(p) => p.color} 75%,
      ${(p) => p.color} 76%,
      transparent 77%,
      transparent
    );
`;

export const Toolbar1 = styled.div`
  padding: 5px;
  display: flex;
  flex-shrink: 0;
`;

export const Content1 = styled.div`
  flex-grow: 1;
  height: 100%;
`;

export const Container1 = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

interface DemoWorkspaceWidgetProps {
  buttons?: any;
}

class DemoWorkspaceWidget extends React.Component<DemoWorkspaceWidgetProps> {
  render() {
    return (
      <Container1>
        <Toolbar1>{this.props.buttons}</Toolbar1>
        <Content1>{this.props.children}</Content1>
      </Container1>
    );
  }
}

class DemoWidget extends React.Component<{ model: DiagramModel; engine: DiagramEngine }, any> {
  engine: DagreEngine;

  constructor(props) {
    super(props);
    this.engine = new DagreEngine({
      graph: {
        rankdir: 'RL',
        ranker: 'longest-path',
        marginx: 25,
        marginy: 25,
      },
      includeLinks: true,
    });
  }

  autoDistribute = () => {
    this.engine.redistribute(this.props.model);

    // only happens if pathfing is enabled (check line 25)
    this.reroute();
    this.props.engine.repaintCanvas();
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.autoDistribute();
    }, 500);
  }

  reroute() {
    this.props.engine
      .getLinkFactories()
      .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
      .calculateRoutingMatrix();
  }

  render() {
    return (
      <DemoWorkspaceWidget buttons={<DemoButton onClick={this.autoDistribute}>Re-distribute</DemoButton>}>
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.engine} />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}

export class DemoCanvasWidget extends React.Component<DemoCanvasWidgetProps> {
  render() {
    return (
      <Container
        background={this.props.background || 'rgb(60, 60, 60)'}
        color={this.props.color || 'rgba(255,255,255, 0.05)'}
      >
        {this.props.children}
      </Container>
    );
  }
}

const nodes = {
  new: 'new',
  interview: 'interview',
  approved: 'approved',
  rejected: 'rejected',
};
const actions = {
  toInterview: 'toInterview',
  approve: 'approve',
  reject: 'reject',
};
const links = [
  { from: 'new', action: 'toInterview', to: 'interview' },
  { from: 'new', action: 'reject', to: 'rejected' },
  { from: 'interview', action: 'approve', to: 'approved' },
  { from: 'interview', action: 'reject', to: 'rejected' },
];

storiesOf('Diagram', module).add('default', () => {
  const [rendered, setRendered] = React.useState(null);

  useMount(() => {
    // setup the diagram engine
    const engine = createEngine();

    // setup the diagram model
    const model = new DiagramModel();

    const nodesModel = _.map(nodes, (name) => new DefaultNodeModel(name, 'rgb(0,192,255)'));
    const nodesFrom = _.map(links, ({ from: name }) => new DefaultNodeModel(name, 'rgb(192,0,255)'));
    const nodesTo = _.map(links, ({ to: name }) => new DefaultNodeModel(name, 'rgb(192,255,0)'));

    _.forEach(nodesModel, (node, index) => node.setPosition(index * 50, index * 50));

    const pathfinding = engine.getLinkFactories().getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);

    const linksModel = _.map(links, ({ from, action, to }) => {
      console.log(action, { from, to });
      const nodeOut = nodesModel.find((model) => model.getOptions().name === from);
      const nodeIn = nodesModel.find((model) => model.getOptions().name === to);

      const portOut = nodeOut.addOutPort(action);
      const portIn = nodeIn.addInPort(`In-${from}-${action}`);

      const link = portOut.link(portIn, pathfinding);
      link.addLabel(new DefaultLabelModel({ label: action, offsetY: 20 }));
      return link;
    });

    // create four nodes in a way that straight links wouldn't work
    /*
    const node1 = new DefaultNodeModel('Node A', 'rgb(0,192,255)');
    const port1 = node1.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
    node1.setPosition(340, 350);

    const node2 = new DefaultNodeModel('Node B', 'rgb(255,255,0)');
    const port2 = node2.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
    node2.setPosition(240, 80);
    const node3 = new DefaultNodeModel('Node C', 'rgb(192,255,255)');
    const port3 = node3.addPort(new DefaultPortModel(true, 'in-1', 'In'));
    node3.setPosition(540, 180);
    const node4 = new DefaultNodeModel('Node D', 'rgb(192,0,255)');
    const port4 = node4.addPort(new DefaultPortModel(true, 'in-1', 'In'));
    node4.setPosition(95, 185);
    const node5 = new DefaultNodeModel('Node E', 'rgb(192,255,0)');
    node5.setPosition(250, 180); */

    // linking things together (specifically using the pathFinding link)
    /*
    const link1 = port1.link(port4, pathFinding);
    const link2 = port2.link(port3, pathFinding);

    link1.addLabel(new DefaultLabelModel({ label: 'I am a label!', offsetY: 20 })); */

    // add all to the main model
    // model.addAll(node1, node2, node3, node4, node5, link1, link2);
    model.addAll(...nodesModel, ...linksModel);

    // load model into engine and render
    engine.setModel(model);

    setRendered(<DemoWidget model={model} engine={engine} />);
  });

  if (rendered) {
    return (
      <div style={{ backgroundColor: 'aliceblue', margin: '1rem', width: '40rem', height: '40rem' }}>{rendered}</div>
    );
  }

  return <div style={{ backgroundColor: 'aliceblue', margin: '1rem' }}>test</div>;
});
