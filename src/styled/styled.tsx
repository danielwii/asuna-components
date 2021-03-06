import React, { ComponentClass } from 'react';
import styled from 'styled-components';

export const FlexCenterBox = (styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f5f5f5;
  border-radius: 0.25rem;
  //padding: 0.1rem;
  margin: 0.1rem;
  overflow: hidden;
` as any) as ComponentClass<{} & React.HTMLAttributes<{}>>;

interface IThumbImage {
  width?: string | number;
  height?: string | number;
}

export const RoundWrapper = styled.div`
  border-radius: 0.1rem;
  overflow: hidden;
  display: inline-block;
`;

export const ThumbImage = (styled.img`
  max-width: ${({ width }) => width || '200px'};
  max-height: ${({ height }) => height || '120px'};
` as any) as ComponentClass<IThumbImage & React.ImgHTMLAttributes<{}>>;

interface IHighlightTitle {
  highlight: boolean;
}

export const Title = (styled.span`
  font-weight: ${(props: IHighlightTitle) => (props.highlight ? 'bold' : 'inherit')};
` as any) as ComponentClass<IHighlightTitle & React.HTMLAttributes<{}>>;

export const Content = (styled.div`
  padding: 0.2rem;
  margin: 0.2rem;
` as any) as ComponentClass<{} & React.HTMLAttributes<{}>>;
