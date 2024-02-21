import React, { FC, useRef, useMemo } from 'react'
import styles from './StatHeader.module.scss'
import { Space, Typography, Button, Input, Tooltip, InputRef, message, Popover } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import QRCode from 'qrcode.react'
import { url } from 'inspector'
const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()

  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy')
    message.success('复制成功')
  }

  // function genLinkAndQRcode() {
  //   if (!isPublished) {
  //     return null
  //   }
  //   const url = `http://localhost:3000/question/${id}`
  //   const QRCodeElem = (
  //     <div style={{ textAlign: 'center' }}>
  //       <QRCode value={url} size={150}></QRCode>
  //     </div>
  //   )
  //   return (
  //     <Space>
  //       <Input value={url} style={{ width: '300px' }} ref={urlInputRef}></Input>
  //       <Tooltip title="拷贝链接">
  //         <Button icon={<CopyOutlined></CopyOutlined>} onClick={copy}></Button>
  //       </Tooltip>
  //       <Popover content={QRCodeElem}>
  //         <Button icon={<QrcodeOutlined></QrcodeOutlined>}></Button>
  //       </Popover>
  //     </Space>
  //   )
  // }
  const LinkAndQRcodeElem = useMemo(() => {
    if (!isPublished) {
      return null
    }
    const url = `https://quesitonnarie-client.vercel.app/question/${id}`
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef}></Input>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined></CopyOutlined>} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined></QrcodeOutlined>}></Button>
        </Popover>
      </Space>
    )
  }, [id, isPublished])
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined></LeftOutlined>} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          {/* {genLinkAndQRcode()} */}
          {LinkAndQRcodeElem}
        </div>
        <div className={styles.right}>
          <Button onClick={() => nav(`/question/edit/${id}`)} type="primary">
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
