import React from 'react';
import { storiesOf } from '@storybook/react';

import 'antd/dist/antd.css';
import Upload from '../src/components/upload';

const formData = {
  maxSize: 5004800,
  width: 415,
  height: 268,
  // maxWidth: 500,
  // maxHeight: 500
};

// 接口返回格式
// errorCode: 1
// errorMessage: ""
// name: "6979dd7b4fbad27fac4ac97d2a6abb73.jpg"
// url: "http://192.168.0.100:8091/uploads/6979dd7b4fbad27fac4ac97d2a6abb73.jpg"

class Layout extends React.Component {
  public state = {
    form: {
      value: '',
      disabled: false,
      action: '//127.0.0.1:8091/upload',
      accept: 'image/jpeg,image/gif,image/png,video/mp4',
      size: 'large',
      onSuccess: (response: any) => {
        console.log(response.url);
        this.setState({
          form: {
            ...this.state.form,
            value: response.url,
          },
        });
      },
      onDelete: () => {
        this.setState({
          form: {
            ...this.state.form,
            value: '',
          },
        });
      },
      onMove: () => {},
    },
  };
  public render() {
    const { form } = this.state;
    return (
      <div className="upload-warp">
        <Upload
          onSuccess={form.onSuccess}
          onMove={form.onMove}
          onCancel={form.onCancel}
          value={form.value}
          size={form.size}
          action={form.action}
          formData={formData}
          accept={form.accept}
          disabled={form.disabled}
        />
      </div>
    );
  }
}

class Layoyt2 extends React.Component {
  public state = {
    form: {
      fileList: [{ value: '' }],
      multiple: true,
      disabled: false,
      action: '//127.0.0.1:8091/upload',
      accept: 'image/jpeg,image/gif,image/png,video/mp4',
      size: 'large',
      onSuccess: (response: any, fileList?: any[]) => {
        this.setState({
          form: {
            ...this.state.form,
            fileList: fileList,
          },
        });
      },
      onDelete: (fileList?: any[]) => {
        this.setState({
          form: {
            ...this.state.form,
            fileList,
          },
        });
      },
      onMove: (fileList?: any[]) => {
        this.setState({
          form: {
            ...this.state.form,
            fileList,
          },
        });
      },
    },
  };
  public render() {
    const { form } = this.state;
    return (
      <div className="upload-warp">
        <Upload
          multiple={form.multiple}
          fileList={form.fileList}
          onMove={form.onMove}
          onSuccess={form.onSuccess}
          onCancel={form.onCancel}
          size={form.size}
          action={form.action}
          formData={formData}
          accept={form.accept}
          disabled={form.disabled}
        />
      </div>
    );
  }
}
class Layoyt3 extends React.Component {
  public state = {
    form: {
      fileList: [{ value: '' }],
      multiple: true,
      disabled: false,
      useNetwork: true,
      action: '//127.0.0.1:3000/upload',
      accept: 'image/jpeg,image/gif,image/png,video/mp4',
      size: 'large',
      onSuccess: (response: any, fileList?: any[]) => {
        this.setState({
          form: {
            ...this.state.form,
            fileList: fileList,
          },
        });
      },
      onDelete: (fileList?: any[]) => {
        this.setState({
          form: {
            ...this.state.form,
            fileList,
          },
        });
      },
      onMove: (fileList?: any[]) => {
        this.setState({
          form: {
            ...this.state.form,
            fileList,
          },
        });
      },
    },
  };
  public render() {
    const { form } = this.state;
    return (
      <div className="upload-warp">
        <Upload
          multiple={form.multiple}
          useNetwork={form.useNetwork}
          fileList={form.fileList}
          onMove={form.onMove}
          onSuccess={form.onSuccess}
          onCancel={form.onCancel}
          size={form.size}
          action={form.action}
          formData={formData}
          accept={form.accept}
          disabled={form.disabled}
        />
      </div>
    );
  }
}
storiesOf('upload', module)
  .add('upload-单张上传', () => <Layout />)
  .add('upload-多图上传', () => <Layoyt2 />)
  .add('upload-网络图片', () => <Layoyt3 />);
