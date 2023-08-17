import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layers from './Layers'
const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined></AppstoreOutlined>组件库
        </span>
      ),
      children: <ComponentLib></ComponentLib>,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined></BarsOutlined>图层
        </span>
      ),
      children: <Layers></Layers>,
    },
  ]
  return <Tabs defaultActiveKey="1" items={tabItems}></Tabs>
}

export default LeftPanel
