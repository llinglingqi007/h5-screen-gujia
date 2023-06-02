import { request } from './http'
interface Time {
  time: string
}
interface trendAchievementParams extends Time {
  parentDeptName: string,
  childDeptName: string,
}
export default {
  getDimension: () => request.get('/report/analysis/dimension'),
  // getAchievement: (data: trendAchievementParams) => request.post('/report/analysis/achievement', data, { noNeedTip: true }),
  getAchievement: (data: trendAchievementParams) => request.post('/report/analysis/achievement', data),
  getTrendAchievement: (data: trendAchievementParams) => request.post('/report/analysis/achievement/trend', data),
  getDeptAchievement: (data: Time) => request.post('/report/analysis/achievement/dept', data),
  getUnachieved: (data: trendAchievementParams) => request.post('/report/analysis/unachieved', data),
  getExpectAchievement: (data: trendAchievementParams) => request.post('/report/analysis/achievement/expect', data),
  getWarning: (data: Time) => request.post('/report/analysis/warning', data),
}
