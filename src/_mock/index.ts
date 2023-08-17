import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    errno: '1',
    data: {
      name: `wjl ${Date.now().toString()}`,
    },
  }
})
