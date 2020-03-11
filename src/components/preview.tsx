/** @jsx jsx */
import { FilePdfOutlined } from '@ant-design/icons';
import { css, jsx } from '@emotion/core';
import { Button, Divider, Input, Modal, Tooltip } from 'antd';
import faker from 'faker';
import * as _ from 'lodash';
import styles from 'prism-themes/themes/prism-synthwave84.css';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { WithDebugInfo } from './debug';
import { FlexCenterBox, ThumbImage } from './styled';

export const WithModal: React.FC<{
  title?: string;
  renderModal: ({ state, setState, setVisible }) => React.ReactNode;
}> = ({ title, renderModal, children }) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<any>();
  return (
    <React.Fragment>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)} closable={false}>
        {renderModal({ state, setState, setVisible })}
      </Modal>
      <Tooltip title={title}>
        <div
          css={css`
            display: inline-block;
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
      <Input.TextArea value={newUrl ?? url} onChange={e => setUrl(e.target.value)} autoSize />
      <Divider type="horizontal" dashed style={{ margin: '1rem 0' }} />
      <Button
        type="primary"
        onClick={() => {
          onEdit(newUrl ?? url);
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
            src={newUrl ?? url}
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
  viewer?: 'modal';
  fullWidth?: boolean;
  renderExtraActions?: (url: string, index: number, total: number) => React.ReactNode;
  renderImage?: (props: { view: React.ReactNode; index: number }) => React.ReactNode;
  children?: (props: { view: React.ReactNode; index: number }) => React.ReactNode;
}) {
  const renderView = (url: string, index: number) => (
    <ImagePreview key={url} url={url}>
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
              <FilePdfOutlined style={{ fontSize: '2rem', padding: '1rem' }} />
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
          <FilePdfOutlined style={{ fontSize: '2rem', padding: '1rem' }} />
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

export const MATCH_REGEX = /{{([^{}]+)}}/g;

export const Preview: React.FC<{
  text: string;
  tmplFields?: { name: string; help?: string; fake?: string }[];
  jsonMode?: boolean;
}> = ({ text, tmplFields, jsonMode }) => {
  const rendered = text?.replace(MATCH_REGEX, substring => {
    const field = _.find(tmplFields, field => `{{${field.name}}}` === substring);
    let rendered = substring;
    try {
      rendered = faker.fake(`{{${field.fake}}}`);
    } catch (e) {}
    return rendered;
  });

  if (jsonMode) {
    let wrapped = rendered;
    let customStyle = { backgroundColor: 'gray', whiteSpace: 'pre-wrap', wordBreak: 'break-word' };
    try {
      wrapped = JSON.stringify(JSON.parse(rendered), null, 2);
      customStyle = { backgroundColor: '#272336', whiteSpace: 'pre-wrap', wordBreak: 'break-word' };
    } catch (e) {}

    return (
      <React.Fragment>
        <SyntaxHighlighter language="json" style={styles} customStyle={customStyle}>
          {wrapped}
        </SyntaxHighlighter>
      </React.Fragment>
    );
  }

  return (
    <pre
      css={css`
        white-space: pre-wrap;
        background-color: ghostwhite;
        .tmpl__field {
          background-color: yellowgreen;
          line-height: 1.5rem;
          border: 1px dashed #d9d9d9;
          border-radius: 2px;
          padding: 0.1rem 0.2rem;
          margin: 0 0.1rem;
          &.warning {
            background-color: goldenrod;
          }
        }
      `}
      dangerouslySetInnerHTML={{
        __html: text?.replace(MATCH_REGEX, substring => {
          const field = _.find(tmplFields, field => `{{${field.name}}}` === substring);
          let rendered = substring;
          try {
            rendered = faker.fake(`{{${field.fake}}}`);
          } catch (e) {}
          return `<span class="tmpl__field ${field ? '' : 'warning'}">${rendered}</span>`;
        }),
      }}
    />
  );
};
