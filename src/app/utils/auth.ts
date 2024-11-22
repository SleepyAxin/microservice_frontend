// utils/auth.ts
import { UserInfo } from '@/app/types/auth'

/**
 * 存储用户信息到本地存储。
 *
 * @param userInfo - 用户信息对象。
 */
export const storeUserInfo = (userInfo: UserInfo) => localStorage.setItem('user-info', JSON.stringify(userInfo))

/**
 * 从本地存储中获取用户信息。
 *
 * @returns 返回用户信息对象，如果未找到则返回 `null`。
 */
export const getStoredUserInfo = (): UserInfo | null => 
{
  const userInfo = localStorage.getItem('user-info')
  return userInfo ? JSON.parse(userInfo) : null
}