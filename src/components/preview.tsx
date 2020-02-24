/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, Divider, Icon, Input, Modal, Tooltip } from 'antd';
import * as _ from 'lodash';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import Viewer from 'react-viewer';
import { ImageDecorator } from 'react-viewer/lib/ViewerProps';
import { WithDebugInfo } from './debug';
import { FlexCenterBox, ThumbImage } from './styled';

export function ReactViewer({
  images,
  index,
  children,
}: { images: ImageDecorator[]; index: number } & { children?: React.ReactNode }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <a onClick={() => setVisible(true)}>{children}</a>
      <Viewer
        activeIndex={index}
        visible={visible}
        onClose={() => setVisible(false)}
        onMaskClick={() => setVisible(false)}
        images={images}
        downloadable
        downloadInNewWindow
      />
    </React.Fragment>
  );
}

export const ImagePreview: React.FC<{ url: string; title?: string; onEdit?: (url: string) => void }> = ({
  title,
  url,
  onEdit,
  children,
}) => {
  const [newUrl, setUrl] = useState(url);
  const [visible, setVisible] = useState(false);
  const editView = onEdit ? (
    <div
      css={css`
        margin: 1rem 0;
        text-align: right;
      `}
    >
      <Input.TextArea value={newUrl} onChange={e => setUrl(e.target.value)} autoSize />
      <Divider type="horizontal" dashed style={{ margin: '1rem 0' }} />
      <Button
        type="primary"
        onClick={() => {
          onEdit(newUrl);
          setVisible(false);
        }}
      >
        Confirm
      </Button>
    </div>
  ) : null;
  return (
    <React.Fragment>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)} closable={false}>
        <div
          css={css`
            display: flex;
            justify-content: center;
            box-shadow: 0 0 1rem #ccc;
          `}
        >
          <img
            css={css`
              max-width: 100%;
            `}
            src={newUrl}
          />
        </div>
        {editView}
      </Modal>
      <Tooltip title={title}>
        <div
          css={css`
            text-align: center;
          `}
          onClick={() => setVisible(true)}
        >
          {children}
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export const PdfButton: React.FC<{ pdf?: string }> = ({ pdf }) =>
  pdf ? (
    <Tooltip title="按住 option/ctrl 下载">
      <Button type="dashed" size="small" href={pdf} target="_blank">
        查看 pdf
      </Button>
    </Tooltip>
  ) : (
    <React.Fragment>无 pdf</React.Fragment>
  );

export function AssetsPreview({
  host,
  urls,
  showPdf,
  viewer,
  fullWidth,
  renderExtraActions,
  renderImage,
  children,
}: {
  host?: string;
  urls: string[];
  showPdf?: boolean;
  viewer?: 'modal' | 'react-viewer';
  fullWidth?: boolean;
  renderExtraActions?: (url: string, index: number, total: number) => React.ReactNode;
  renderImage?: (props: { view: React.ReactNode; index: number }) => React.ReactNode;
  children?: (props: { view: React.ReactNode; index: number }) => React.ReactNode;
}) {
  const renderView = (url: string, index: number) =>
    viewer === 'react-viewer' ? (
      <ReactViewer key={index} index={index} images={urls.map(url => ({ src: url, downloadUrl: url }))}>
        <AssetPreview key={url} host={host} url={url} showPdf={showPdf} />
      </ReactViewer>
    ) : (
      <ImagePreview key={index} url={url}>
        <div
          css={css`
            display: inline-block;
            cursor: pointer;
            margin: 0.5rem;
            //border-radius: 0.2rem;
            //overflow: hidden;
            box-shadow: 0 0 0.1rem #eee;
            :hover {
              box-shadow: 0 0 0.5rem #ccc;
            }
          `}
        >
          {renderImage ? renderImage({ view: <ThumbImage src={url} />, index }) : <ThumbImage src={url} />}
        </div>
      </ImagePreview>
    );

  return (
    <div
      style={
        fullWidth ? { display: 'flex', flexWrap: 'wrap' } : { display: 'flex', flexWrap: 'wrap', maxWidth: '400px' }
      }
    >
      {_.map(urls, (url, index) => (
        <div key={`viewer-${index}`}>
          {children ? children({ view: renderView(url, index), index }) : renderView(url, index)}
          <div
            css={css`
              text-align: center;
            `}
          >
            <div
              css={css`
                padding: 0.2rem 0.5rem;
              `}
            >
              {/*<TooltipContent value={url} link />*/}
              {renderExtraActions(url, index, urls.length)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface IAssetPreviewProps {
  host?: string;
  url: string;
  width?: number;
  height?: number;
  showPdf?: boolean;
  fullWidth?: boolean;
}

interface IAssetPreviewState {
  numPages: number | null;
  pageNumber: number;
  loading: boolean;
}

export function AssetPreview({ url, width, height, showPdf, fullWidth }: IAssetPreviewProps) {
  const [state, setState] = useState<IAssetPreviewState>({ numPages: null, pageNumber: 1, loading: true });
  const href = url;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setState({ numPages, pageNumber: 1, loading: false });
  };

  /*
  const renderLeftPages = () =>
    state.pageNumber > 1 ? (
      _.times(state.pageNumber - 1, page => (
        <Page pageNumber={page + 1} weight={fullWidth ? null : 200} />
      ))
    ) : (
      <React.Fragment />
    );
*/

  if (/pdf$/.test(url)) {
    return showPdf ? (
      <WithDebugInfo info={state}>
        {!state.loading && (
          <div>
            <a href={href} target="_blank">
              <Icon type="file-pdf" style={{ fontSize: '2rem', padding: '1rem' }} />
            </a>
            {state.numPages} pages in total.
          </div>
        )}
        <FlexCenterBox key={url}>
          <a href={href} target="_blank">
            <Document file={href} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={state.pageNumber} width={fullWidth ? (null as any) : width ?? 200} />
            </Document>
          </a>
        </FlexCenterBox>
      </WithDebugInfo>
    ) : (
      <FlexCenterBox>
        <a href={href} target="_blank">
          <Icon type="file-pdf" style={{ fontSize: '2rem', padding: '1rem' }} />
        </a>
      </FlexCenterBox>
    );
  }
  return (
    <FlexCenterBox key={url}>
      <ThumbImage height={height} width={fullWidth ? '100%' : ''} src={url} />
    </FlexCenterBox>
  );
}
