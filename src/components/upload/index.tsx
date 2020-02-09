/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import React from 'react';
import { Upload, Icon, message, Modal, Input } from 'antd';
import { loadReaderAsync } from './utils';

// import 'antd/dist/antd.css';

export interface IFormData {
  maxSize: number; // 最大尺寸大小
  width: number; // 宽度
  height: number; // 高度
  maxWidth: number; // 最大宽度
  maxHeight: number; // 最大高度
}
export interface IProps {
  action: string; // 图片上传的接口地址，必填，string类型
  disabled: boolean; // 是否禁用上传功能，选填，默认false，boolean类型
  value: string; // 单图模式的图片地址，单图模式必须传，必填，string类型
  formData: IFormData; // 上传图片大小尺寸
  accept: string; // 文件尺寸，多个以逗号分割，选填，默认：image/jpg,image/png,image/gif，string类型
  size: 'small' | 'default' | 'large'; // 上传组件样式大小，默认'default‘，string类型
  multiple?: boolean; // 是否启用多图上传模式，选填，默认false，boolean类型
  fileList: any[]; // 多图模式的图片地址集合，必填，格式为[{ value: '' }]，array类型
  useNetwork?: boolean; // 是否使用网络地址功能，选填，默认false，boolean类型
  onSuccess: (response: any, fileList?: any[]) => void; // 成功事件回调，必填
  onDelete: (fileList?: any[]) => void; // 删除事件回调，必填
  onMove: (fileList?: any[]) => void; // 排序事件回调，必填
}
export interface IAntdFileBo {
  file: {
    response: any;
  };
}

export default class ImgUpload extends React.Component<IProps> {
  static defaultProps = {
    action: '/upload',
    disabled: false,
    value: '',
    formData: {},
    accept: 'image/jpeg,image/gif,image/png',
    size: 'default',
    multiple: false,
  };
  public state = {
    data: {},
    previewVisible: false,
    visibleNetwork: false,
    networkValue: '',
    networkCurrIndex: 0,
    imageUrl: '',
    loading: false,
  };
  public isLast: boolean = false;
  public currIndex: number | undefined;
  public imgInfo: { width: string; height: string } | undefined;
  public beforeUpload(file: File, antdFileList: any[], index: number | undefined): any {
    const { formData, accept, disabled, multiple, fileList } = this.props;
    if (multiple) {
      this.isLast = fileList.length - 1 === index;
      this.currIndex = index;
    }
    if (formData && file.size > formData.maxSize) {
      message.error(`上传的文件不能超过${formData.maxSize / 1024}kb`);
      return false;
    }
    if ((accept && accept.indexOf(file.type) === -1) || !file.type) {
      message.error('格式不正确,请重新上传');
      return false;
    }
    if (disabled) {
      return false;
    }
    if (file.type.indexOf('video/')) {
      return true;
    }
    if (formData && file.type.indexOf('image/')) {
      this.setState({ data: formData });
      return loadReaderAsync(file, this);
    }
  }
  public handleCancel = () => {
    this.setState({ previewVisible: false });
  };
  public handleChange(fileBo: IAntdFileBo) {
    if (fileBo.file.response) {
      const { multiple } = this.props;
      if (multiple) {
        const list: any[] = this.props.fileList;
        if (this.isLast) {
          list.splice(list.length - 1, 1);
          this.props.onSuccess(fileBo.file.response, [...list, { value: fileBo.file.response.url }, { value: '' }]);
        } else {
          list[this.currIndex || 0] = { value: fileBo.file.response.url };
          this.props.onSuccess(fileBo.file.response, [...list]);
        }
      } else {
        this.props.onSuccess(fileBo.file.response);
      }
    }
  }
  public handleDelete(index: number | undefined) {
    const { multiple } = this.props;
    if (multiple) {
      const list: any[] = this.props.fileList;
      list.splice(this.currIndex || 0, 1);
      this.props.onDelete([...list]);
    } else {
      this.props.onDelete();
    }
  }
  public handleEnlarge() {
    this.setState({ previewVisible: true });
  }
  public handleMove(position: string, index: number | undefined) {
    index = index || 0;
    const { fileList, onMove } = this.props;
    const currItem = fileList[index];

    switch (position) {
      case 'left':
        const leftItem = fileList[index - 1];
        fileList.splice(index - 1, 2, currItem, leftItem);
        break;
      case 'right':
        const rightItem = fileList[index + 1];
        fileList.splice(index, 2, rightItem, currItem);
        break;
    }
    if (typeof onMove === 'function') {
      onMove(fileList);
    }
  }
  public handleEditNetwork(index: number | undefined) {
    index = index || 0;
    const { fileList } = this.props;
    this.setState(
      {
        ...this.state,
        visibleNetwork: true,
        networkCurrIndex: index,
        networkValue: fileList[index].value,
      },
      () => {},
    );
  }
  public handleModalNetworkOk() {
    const { fileList, onSuccess } = this.props;
    const { networkCurrIndex, networkValue } = this.state;
    if (networkCurrIndex === fileList.length - 1) {
      fileList.push({ value: '' });
    }
    fileList[networkCurrIndex].value = networkValue;
    onSuccess(null, fileList);
    this.setState({
      ...this.state,
      visibleNetwork: false,
      networkValue: '',
    });
  }
  public handleNetworkChange = (event: any) => {
    this.setState({
      ...this.state,
      networkValue: event.target.value,
    });
  };
  public handleModalNetworkCancel() {
    // visibleNetwork: false,
    this.setState(
      {
        ...this.state,
        visibleNetwork: false,
        networkValue: '',
      },
      () => {
        console.log(this.state, 1);
      },
    );
  }
  public render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { size, action, disabled, multiple, useNetwork, fileList } = this.props;
    const uploadItem = (forFile: any, index?: number) => {
      return (
        <section
          className={size}
          key={index}
          css={css`
            position: relative;
            display: inline-block;
            &.small {
              width: 104px;
              height: 104px;
            }
            &.default {
              width: 154px;
              height: 154px;
            }
            &.large {
              width: 204px;
              height: 204px;
            }
            .ant-upload.ant-upload-select-picture-card {
              width: 100%;
              height: 100%;
              img {
                width: 100%;
              }
            }
            .ant-upload-picture-card-wrapper {
              height: 100%;
            }

            .upload-operate {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              color: #fff;
              text-align: center;
              display: none;
              .anticon {
                margin-left: 10px;
                cursor: pointer;
              }
            }
            &:hover {
              .upload-operate {
                display: block;
              }
            }
          `}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            action={action}
            showUploadList={false}
            disabled={disabled}
            multiple={multiple}
            beforeUpload={(file: File, fileList: any[]) => this.beforeUpload(file, fileList, index)}
            onChange={(file: any) => this.handleChange(file)}
          >
            {forFile.value ? <img alt="" src={forFile.value} /> : uploadButton}
          </Upload>
          {forFile.value ? (
            <div className="upload-operate">
              <Icon type="delete" onClick={() => this.handleDelete(index)} />
              <Icon type="eye" onClick={() => this.handleEnlarge()} />
              {multiple && fileList.length - 2 === index ? null : (
                <Icon type="arrow-right" onClick={() => this.handleMove('right', index)} />
              )}
              {multiple && index !== 0 ? (
                <Icon type="arrow-left" onClick={() => this.handleMove('left', index)} />
              ) : null}
              {useNetwork ? <Icon type="area-chart" onClick={() => this.handleEditNetwork(index)} /> : null}
            </div>
          ) : null}
          {!forFile.value && useNetwork ? (
            <div className="upload-operate">
              {useNetwork ? <Icon type="area-chart" onClick={() => this.handleEditNetwork(index)} /> : null}
            </div>
          ) : null}
        </section>
      );
    };
    return (
      <div
        css={css`
          display: inline-block;
        `}
      >
        {multiple
          ? fileList.map((file: any[], index: number) => uploadItem(file, index))
          : uploadItem({ ...this.props })}
        {useNetwork ? (
          <Modal
            title="网络地址"
            visible={this.state.visibleNetwork}
            onOk={() => this.handleModalNetworkOk()}
            onCancel={() => this.handleModalNetworkCancel()}
          >
            <Input
              placeholder="请输入网络图片地址"
              value={this.state.networkValue}
              onChange={this.handleNetworkChange}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}
