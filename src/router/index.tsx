import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// import MainLayout from '../layouts/MainLayout'
const MainLayout = React.lazy(() => import('../layouts/MainLayout'))
// import ManageLayout from '../layouts/ManageLayout'
const ManageLayout = React.lazy(() => import('../layouts/ManageLayout'))
// import QuestionLayout from '../layouts/QuestionLayout'
const QuestionLayout = React.lazy(() => import('../layouts/QuestionLayout'))
// import Home from '../pages/Home'
const Home = React.lazy(() => import('../pages/Home'))
// import Login from '../pages/Login'
const Login = React.lazy(() => import('../pages/Login'))
// import Register from '../pages/Register'
const Register = React.lazy(() => import('../pages/Register'))
// import NotFound from '../pages/NotFound'
const NotFound = React.lazy(() => import('../pages/NotFound'))
// import List from '../pages/manage/List'
const List = React.lazy(() => import('../pages/manage/List'))
// import Trash from '../pages/manage/Trash'
const Trash = React.lazy(() => import('../pages/manage/Trash'))
// import Star from '../pages/manage/Star'
const Star = React.lazy(() => import('../pages/manage/Star'))
// import Edit from '../pages/question/Edit'
const Edit = React.lazy(() => import(/*webpackChunkName:"edit" */ '../pages/question/Edit'))
// import Stat from '../pages/question/Stat'
const Stat = React.lazy(() => import(/*webpackChunkName:"stat" */ '../pages/question/Stat'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: (
          <React.Suspense fallback={<p>loading...</p>}>
            <Home></Home>
          </React.Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <React.Suspense fallback={<p>loading...</p>}>
            <Login></Login>
          </React.Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <React.Suspense fallback={<p>loading...</p>}>
            <Register></Register>
          </React.Suspense>
        ),
      },
      {
        path: 'manage',
        element: (
          <React.Suspense fallback={<p>loading...</p>}>
            <ManageLayout></ManageLayout>
          </React.Suspense>
        ),
        children: [
          {
            path: 'list',
            element: (
              <React.Suspense fallback={<p>loading...</p>}>
                <List></List>
              </React.Suspense>
            ),
          },
          {
            path: 'star',
            element: (
              <React.Suspense fallback={<p>loading...</p>}>
                <Star></Star>
              </React.Suspense>
            ),
          },
          {
            path: 'trash',
            element: (
              <React.Suspense fallback={<p>loading...</p>}>
                <Trash></Trash>
              </React.Suspense>
            ),
          },
        ],
      },

      {
        path: '*',
        element: (
          <React.Suspense fallback={<p>loading...</p>}>
            <NotFound></NotFound>
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: 'question',
    element: (
      <React.Suspense fallback={<p>loading...</p>}>
        <QuestionLayout></QuestionLayout>
      </React.Suspense>
    ),
    children: [
      {
        path: 'edit/:id',
        element: (
          <React.Suspense fallback={<p>loading...</p>}>
            <Edit></Edit>
          </React.Suspense>
        ),
      },
      {
        path: 'stat/:id',
        element: (
          <React.Suspense fallback={<p>loading...</p>}>
            <Stat></Stat>
          </React.Suspense>
        ),
      },
    ],
  },
])
export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}
