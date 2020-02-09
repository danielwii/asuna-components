import { message } from 'antd'

function loadImageAsync(url: string, context: any) {
  const { formData } = context.props
  return new Promise((resolve, reject) => {
    const newImage = new Image()
    newImage.src = url
    newImage.onload = () => {
      const imgInfo = {
        height: newImage.height,
        width: newImage.width
      }
      if (formData.width || formData.height) {
        context.setState({ data: {
          ...context.data,
          width: imgInfo.width,
          height: imgInfo.height
        }})
      }
      context.imgInfo = imgInfo
      if (formData.maxHeight && formData.maxWidth) {
        // 判断最大高宽双条件
        if (
          imgInfo.height > formData.maxHeight ||
          imgInfo.width > formData.maxWidth
        ) {
          message.error(
            `图片尺寸限制为最大宽度${formData.maxWidth}, 最大高度${formData.maxHeight}，请重新上传`
          )
          reject()
          return
        }
      }
      if (formData.maxHeight || formData.maxWidth) {
        // 判断最大高宽单条件
        if (
          formData.maxHeight &&
          formData.maxHeight < imgInfo.height
        ) {
          message.error(
            `图片尺寸限制最大高度${formData.maxHeight}，请重新上传`
          )
          reject()
          return
        } else if (
          formData.maxWidth &&
          formData.maxWidth < imgInfo.width
        ) {
          message.error(
            `图片尺寸限制最大宽度${formData.maxWidth}，请重新上传`
          )
          reject()
          return
        }
      }
      if (formData.minHeight || formData.minWidth) {
        // 判断最小高宽单条件
        if (
          formData.minHeight &&
          formData.minHeight > imgInfo.height
        ) {
          message.error(
            `图片尺寸限制最小高度${formData.minHeight}，请重新上传`
          )
          reject()
          return
        } else if (
          formData.minWidth &&
          formData.minWidth < imgInfo.width
        ) {
          message.error(
            `图片尺寸限制最小宽度${formData.minWidth}，请重新上传`
          )
          reject()
          return
        }
      }
      if (formData.height && formData.width) {
        // 判断高宽双条件
        if (
          formData.height === imgInfo.height &&
          formData.width === imgInfo.width
        ) {
          resolve()
        } else {
          message.error(
            `图片尺寸限制为${formData.width}*${formData.height}，请重新上传`
          )
          reject()
          return
        }
      } else if (formData.height || formData.width) {
        // 判断高宽单条件
        if (formData.height && formData.height !== imgInfo.height) {
          message.error(
            `图片尺寸限制高度${formData.height}，请重新上传`
          )
          reject()
        } else if (
          formData.width &&
          formData.width !== imgInfo.width
        ) {
          message.error(
            `图片尺寸限制宽度${formData.width}，请重新上传`
          )
          reject()
          return
        }
      }
      resolve()
    }
  })
}
export function loadReaderAsync(evt: File, context: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (src: any) => {
      resolve(loadImageAsync(src.target.result, context))
    }
    reader.readAsDataURL(evt)
  })
}
