import Cookies from 'js-cookie'
export const getToken = () => {
  return Cookies.get('dap_app_UACTOKEN')
}
