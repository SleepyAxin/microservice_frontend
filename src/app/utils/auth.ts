// utils/auth.ts
import { UserInfo } from '@/app/types/auth'
import Cookies from 'js-cookie'

/**
 * 存储用户信息到`Cookie`。
 * @param userInfo - 用户信息对象。
 */
export const storeUserInfo = (userInfo: UserInfo) =>
{
  Cookies.set('user-info', JSON.stringify(userInfo), { expires: 30 })
}

/**
 * 从本地存储中获取用户信息。
 * @returns 返回用户信息对象，如果未找到则返回 `null`。
 */
export const getStoredUserInfo = (): UserInfo | null => 
{
  const userStr = Cookies.get('user-info')
  return userStr ? JSON.parse(userStr) : null
}

/**
 * 用户是否已通过身份验证
 * @returns 返回用户是否已通过身份验证。
 */
export const isAuthenticated = (): boolean => getStoredUserInfo() !== null