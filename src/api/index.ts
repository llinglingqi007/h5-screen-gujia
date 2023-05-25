import { request } from './http'

export default {
  getTheme: () => request.get('/api/portal/user/default/theme'),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
}
