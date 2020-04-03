import { storiesOf } from '@storybook/react';
import { Divider } from 'antd';

import 'antd/dist/antd.css';
import { html } from 'common-tags';
import React from 'react';
import { StateFC, StringTmpl } from '../src';

const StoreProvider: StateFC<{ tmpl: string }> = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  return <div>{children(state, setState)}</div>;
};

storiesOf('StringTmpl', module)
  .add('default', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider
        initialState={{
          tmpl:
            'a={{n1}}&b={{n2}}&n3={{n3}}&n4={{n4}}&n5={{n5}}&n6={{n6}}&n7={{n7}}&no-fake={{no-fake}}&error={{error}}',
        }}
      >
        {(state, setState) => (
          <>
            <StringTmpl
              tmpl={state.tmpl}
              fields={[
                { name: 'n1', help: 'i am a help', fake: 'name.findName' },
                { name: 'n2', fake: 'date.recent' },
                { name: 'n3', fake: 'address.city' },
                { name: 'n4', fake: 'commerce.product' },
                { name: 'n5', fake: 'internet.email' },
                { name: 'n6', fake: 'internet.ipv6' },
                { name: 'n7', fake: 'lorem.words' },
                { name: 'no-fake' },
              ]}
              onChange={(tmpl) => setState({ tmpl })}
            />
            <Divider />
            {JSON.stringify(state)}
          </>
        )}
      </StoreProvider>
    </div>
  ))
  .add('default-json-preview', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider initialState={{ tmpl: '{"a": "a", "b": 1, "c": true, "date": "{{n2}}"}' }}>
        {(state, setState) => (
          <>
            <StringTmpl
              tmpl={state.tmpl}
              fields={[{ name: 'n2', fake: 'date.recent' }]}
              onChange={(tmpl) => setState({ tmpl })}
              jsonMode
            />
            <Divider />
            {JSON.stringify(state)}
          </>
        )}
      </StoreProvider>
    </div>
  ))
  .add('default-html-preview', () => (
    <div style={{ margin: '1rem' }}>
      <StoreProvider
        initialState={{
          tmpl: html`<td
            align="center"
            valign="top"
            id="templateBody"
            data-template-container=""
            style="
    background: #ffffff none no-repeat center/cover;
    mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    background-color: #ffffff;
    background-image: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-top: 0;
    border-bottom: 0;
    padding-top: 36px;
    padding-bottom: 45px;
  "
          >
            <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              class="templateContainer"
              style="
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      max-width: 600px !important;
    "
            >
              <tbody>
                <tr>
                  <td
                    valign="top"
                    class="bodyContainer"
                    style="
            background: transparent none no-repeat center/cover;
            mso-line-height-rule: exactly;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            background-color: transparent;
            background-image: none;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border-top: 0;
            border-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
          "
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      class="mcnImageBlock"
                      style="
              min-width: 100%;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            "
                    >
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td
                            valign="top"
                            style="
                    padding: 9px;
                    mso-line-height-rule: exactly;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                            class="mcnImageBlockInner"
                          >
                            <table
                              align="left"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="mcnImageContentContainer"
                              style="
                      min-width: 100%;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="mcnImageContent"
                                    valign="top"
                                    style="
                            padding-right: 9px;
                            padding-left: 9px;
                            padding-top: 0;
                            padding-bottom: 0;
                            text-align: center;
                            mso-line-height-rule: exactly;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                          "
                                  >
                                    <img
                                      align="center"
                                      alt=""
                                      src="https://mcusercontent.com/79f560b1726a7e6a1da3c4453/images/f77f0e5b-0777-454d-af0b-a755854e916c.jpeg"
                                      width="180.48"
                                      style="
                              max-width: 640px;
                              padding-bottom: 0;
                              display: inline !important;
                              vertical-align: bottom;
                              border: 0;
                              height: auto;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                            "
                                      class="mcnImage"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      class="mcnTextBlock"
                      style="
              min-width: 100%;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            "
                    >
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td
                            valign="top"
                            class="mcnTextBlockInner"
                            style="
                    padding-top: 9px;
                    mso-line-height-rule: exactly;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                          >
                            <!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

                            <!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                            <table
                              align="left"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                      max-width: 100%;
                      min-width: 100%;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                              width="100%"
                              class="mcnTextContentContainer"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    class="mcnTextContent"
                                    style="
                            padding: 0px 18px 9px;
                            font-family: 'Open Sans', 'Helvetica Neue',
                              Helvetica, Arial, sans-serif;
                            font-size: 16px;
                            line-height: 200%;
                            mso-line-height-rule: exactly;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            word-break: break-word;
                            color: #757575;
                            text-align: left;
                          "
                                  >
                                    <h3
                                      style="
                              display: block;
                              margin: 0;
                              padding: 0;
                              color: #444444;
                              font-family: Helvetica;
                              font-size: 22px;
                              font-style: normal;
                              font-weight: bold;
                              line-height: 150%;
                              letter-spacing: normal;
                              text-align: left;
                            "
                                    >
                                      雇视丨理想工作安心求职高效招聘
                                    </h3>

                                    <p
                                      style="
                              font-family: 'Open Sans', 'Helvetica Neue',
                                Helvetica, Arial, sans-serif;
                              font-size: 16px;
                              line-height: 200%;
                              margin: 10px 0;
                              padding: 0;
                              mso-line-height-rule: exactly;
                              -ms-text-size-adjust: 100%;
                              -webkit-text-size-adjust: 100%;
                              color: #757575;
                              text-align: left;
                            "
                                    >
                                      雇视是一家以品牌驱动招聘、增强用户雇/聘体验的解决方案公司，随着雇主品牌与招聘市场的革新与快速变化，我们致力于成为人力资源领域最优质的雇主品牌资产管理与流量运营伙伴，以年轻的思维、有创意的理念以及科学的方法论帮助并见证企业雇主品牌与人才招募的可持续发展。<br />
                                      <br />
                                      此封邮件是我们发送的简历邮件，根据你们的招聘需求，通过将职位放在我们的小程序分发收到的简历，可以放心点击查看。
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]>
				</td>
				<![endif]-->

                            <!--[if mso]>
				</tr>
				</table>
				<![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      class="mcnDividerBlock"
                      style="
              min-width: 100%;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              table-layout: fixed !important;
            "
                    >
                      <tbody class="mcnDividerBlockOuter">
                        <tr>
                          <td
                            class="mcnDividerBlockInner"
                            style="
                    min-width: 100%;
                    padding: 18px;
                    mso-line-height-rule: exactly;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                          >
                            <table
                              class="mcnDividerContent"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                      min-width: 100%;
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                            mso-line-height-rule: exactly;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                          "
                                  >
                                    <span></span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      class="mcnCaptionBlock"
                      style="
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            "
                    >
                      <tbody class="mcnCaptionBlockOuter">
                        <tr>
                          <td
                            class="mcnCaptionBlockInner"
                            valign="top"
                            style="
                    padding: 9px;
                    mso-line-height-rule: exactly;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                          >
                            <table
                              align="left"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="mcnCaptionBottomContent"
                              width="282"
                              style="
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="mcnCaptionBottomImageContent"
                                    align="center"
                                    valign="top"
                                    style="
                            padding: 0 9px 9px 9px;
                            mso-line-height-rule: exactly;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                          "
                                  >
                                    <img
                                      alt=""
                                      src="https://mcusercontent.com/79f560b1726a7e6a1da3c4453/images/53d54c90-a8b6-4f89-8164-b844e74d1aea.jpg"
                                      width="200"
                                      style="
                              max-width: 200px;
                              border: 0;
                              height: auto;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                              vertical-align: bottom;
                            "
                                      class="mcnImage"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="mcnTextContent"
                                    valign="top"
                                    style="
                            padding: 0px 9px;
                            font-family: 'Open Sans', 'Helvetica Neue',
                              Helvetica, Arial, sans-serif;
                            font-size: 16px;
                            line-height: 100%;
                            mso-line-height-rule: exactly;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            word-break: break-word;
                            color: #757575;
                            text-align: left;
                          "
                                    width="282"
                                  >
                                    <h4
                                      style="
                              display: block;
                              margin: 0;
                              padding: 0;
                              color: #949494;
                              font-family: Georgia;
                              font-size: 20px;
                              font-style: italic;
                              font-weight: normal;
                              line-height: 125%;
                              letter-spacing: normal;
                              text-align: left;
                            "
                                    >
                                      雇视小程序
                                    </h4>

                                    <p
                                      style="
                              margin: 10px 0;
                              padding: 0;
                              mso-line-height-rule: exactly;
                              -ms-text-size-adjust: 100%;
                              -webkit-text-size-adjust: 100%;
                              color: #757575;
                              font-family: Helvetica;
                              font-size: 16px;
                              line-height: 150%;
                              text-align: left;
                            "
                                    >
                                      微信扫描小程序码可以体验小程序
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table
                              align="right"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="mcnCaptionBottomContent"
                              width="282"
                              style="
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                    "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="mcnCaptionBottomImageContent"
                                    align="center"
                                    valign="top"
                                    style="
                            padding: 0 9px 9px 9px;
                            mso-line-height-rule: exactly;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                          "
                                  >
                                    <img
                                      alt=""
                                      src="https://mcusercontent.com/79f560b1726a7e6a1da3c4453/images/0df73024-cfbb-4952-b905-1ecdd172eaf7.jpeg"
                                      width="200"
                                      style="
                              max-width: 200px;
                              border: 0;
                              height: auto;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                              vertical-align: bottom;
                            "
                                      class="mcnImage"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="mcnTextContent"
                                    valign="top"
                                    style="
                            padding: 0px 9px;
                            font-family: 'Open Sans', 'Helvetica Neue',
                              Helvetica, Arial, sans-serif;
                            font-size: 16px;
                            line-height: 100%;
                            mso-line-height-rule: exactly;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                            word-break: break-word;
                            color: #757575;
                            text-align: left;
                          "
                                    width="282"
                                  >
                                    <h4
                                      style="
                              display: block;
                              margin: 0;
                              padding: 0;
                              color: #949494;
                              font-family: Georgia;
                              font-size: 20px;
                              font-style: italic;
                              font-weight: normal;
                              line-height: 125%;
                              letter-spacing: normal;
                              text-align: left;
                            "
                                    >
                                      联系我们
                                    </h4>

                                    <p
                                      style="
                              margin: 10px 0;
                              padding: 0;
                              mso-line-height-rule: exactly;
                              -ms-text-size-adjust: 100%;
                              -webkit-text-size-adjust: 100%;
                              color: #757575;
                              font-family: Helvetica;
                              font-size: 16px;
                              line-height: 150%;
                              text-align: left;
                            "
                                    >
                                      对于我们有任何疑问或是寻求沟通，可使用微信扫码添加我们负责联系的同学
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
          </td> `,
        }}
      >
        {(state, setState) => (
          <>
            <StringTmpl
              tmpl={state.tmpl}
              fields={[{ name: 'n2', fake: 'date.recent' }]}
              onChange={(tmpl) => setState({ tmpl })}
              htmlMode
            />
            <Divider />
            {JSON.stringify(state)}
          </>
        )}
      </StoreProvider>
    </div>
  ));
