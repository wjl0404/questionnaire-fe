import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
enum TAB_KEY {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel = () => {
  const [activityKey, setActivityKey] = useState(TAB_KEY.PROP_KEY)
  const { selectedId } = useGetComponentInfo()
  useEffect(() => {
    if (selectedId) setActivityKey(TAB_KEY.PROP_KEY)
    else setActivityKey(TAB_KEY.SETTING_KEY)
  }, [selectedId])
  const tabsItems = [
    {
      key: TAB_KEY.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>属性
        </span>
      ),
      children: <ComponentProp></ComponentProp>,
    },
    {
      key: TAB_KEY.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined></SettingOutlined>页面设置
        </span>
      ),
      children: <PageSetting></PageSetting>,
    },
  ]
  return <Tabs activeKey={activityKey} items={tabsItems}></Tabs>
}

export default RightPanel
