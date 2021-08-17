import AccountController from '@controller/AccountController'

export type AppController = AccountController // | other controllers to be added here

export interface RouteConfig {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  route: string
  controller: AppController
}

const Routes = [
  {
    method: 'get',
    route: '/users',
    controller: AccountController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: AccountController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/users',
    controller: AccountController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: AccountController,
    action: 'remove',
  },
]

export default Routes
