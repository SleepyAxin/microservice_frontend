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

/**
 * 存储认证令牌到本地存储。
 *
 * @param token - 认证令牌字符串。
 */
export const storeAuthToken = (token: string) => localStorage.setItem('auth-token', token)

/**
 * 从本地存储中获取认证令牌。
 *
 * @returns 返回认证令牌字符串，如果未找到则返回 `null`。
 */
export const getStoredAuthToken = (): string | null => localStorage.getItem('auth-token')

/**
 * 检查用户是否已认证。
 *
 * @returns 如果存在有效的认证令牌，则返回 `true`，否则返回 `false`。
 */
export const isAuthenticated = (): boolean => !!getStoredAuthToken()