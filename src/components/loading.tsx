import React from 'react';

// import 'spinkit/spinkit.min.css'

export class Loading extends React.PureComponent<{
  type:
    | 'plane'
    | 'chase'
    | 'wander'
    | 'fold'
    | 'grid'
    | 'circle-fade'
    | 'circle'
    | 'swing'
    | 'flow'
    | 'pulse'
    | 'wave'
    | 'bounce';
}> {
  render() {
    const { type } = this.props;
    switch (type) {
      case 'wander':
        return (
          <div className="sk-wander">
            <div className="sk-wander-cube" />
            <div className="sk-wander-cube" />
            <div className="sk-wander-cube" />
          </div>
        );
      case 'fold':
        return (
          <div className="sk-fold">
            <div className="sk-fold-cube" />
            <div className="sk-fold-cube" />
            <div className="sk-fold-cube" />
            <div className="sk-fold-cube" />
          </div>
        );
      case 'grid':
        return (
          <div className="sk-grid">
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
            <div className="sk-grid-cube" />
          </div>
        );
      case 'circle-fade':
        return (
          <div className="sk-circle-fade">
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
            <div className="sk-circle-fade-dot" />
          </div>
        );
      case 'circle':
        return (
          <div className="sk-circle">
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
            <div className="sk-circle-dot" />
          </div>
        );
      case 'swing':
        return (
          <div className="sk-swing">
            <div className="sk-swing-dot" />
            <div className="sk-swing-dot" />
          </div>
        );
      case 'flow':
        return (
          <div className="sk-flow">
            <div className="sk-flow-dot" />
            <div className="sk-flow-dot" />
            <div className="sk-flow-dot" />
          </div>
        );
      case 'pulse':
        return <div className="sk-pulse" />;
      case 'wave':
        return (
          <div className="sk-wave">
            <div className="sk-wave-rect" />
            <div className="sk-wave-rect" />
            <div className="sk-wave-rect" />
            <div className="sk-wave-rect" />
            <div className="sk-wave-rect" />
          </div>
        );
      case 'bounce':
        return (
          <div className="sk-bounce">
            <div className="sk-bounce-dot" />
            <div className="sk-bounce-dot" />
          </div>
        );
      case 'chase':
        return (
          <div className="sk-chase">
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
          </div>
        );
      case 'plane':
      default:
        return <div className="sk-plane" />;
    }
  }
}

export type LoadingType =
  | 'plane'
  | 'chase'
  | 'wander'
  | 'fold'
  | 'grid'
  | 'circle-fade'
  | 'circle'
  | 'swing'
  | 'flow'
  | 'pulse'
  | 'wave'
  | 'bounce';

export const loadingList: LoadingType[] = [
  'plane',
  'chase',
  'wander',
  'fold',
  'grid',
  'circle-fade',
  'circle',
  'swing',
  'flow',
  'pulse',
  'wave',
  'bounce',
];
