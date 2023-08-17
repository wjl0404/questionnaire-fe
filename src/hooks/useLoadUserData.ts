import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })
  // 检查用户信息是否已经存在
  useEffect(() => {
    if (username) {
      setWaitingUserData(false) //已经存在信息 不需要加载
      return
    }
    run()
  }, [username])
  return { waitingUserData }
}
export default useLoadUserData
