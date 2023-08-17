import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
const { Search } = Input
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'
const ListSearch = () => {
  const [value, setValue] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleSearch = (value: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键词"
      onSearch={handleSearch}
      style={{ width: '200px' }}
      onChange={handleChange}
    ></Search>
  )
}

export default ListSearch
