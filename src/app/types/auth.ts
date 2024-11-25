// types/auth.ts

/**
 * 登录表单值接口
 * @interface LoginFormValues
 * @property { string } username - 用户名
 * @property { string } password - 密码
 */
export interface LoginFormValues 
{
  username: string
  password: string
}

/**
 * 注册表单值接口
 * @interface RegisterFormValues
 * @property { string } username - 用户名
 * @property { string } password - 密码
 * @property { string } password_confirm - 确认密码
 */
export interface RegisterFormValues 
{
  username: string
  password: string
  password_confirm: string
}

/**
 * 用户信息接口
 * @interface UserInfo
 * @property { number } id - 用户ID
 * @property { string } username - 用户名
 * @property { string } password - 密码
 */
export interface UserInfo 
{
  id: number
  username: string
  password: string
}

/**
 * 认证响应接口
 * @interface AuthResponse
 * @property { UserInfo } user - 用户信息
 */
export interface AuthResponse 
{
  id: number
  username: string
  password: string
}

/**
 * API 错误接口
 * @interface ApiError
 * @property { string } code - 错误代码
 * @property { string } message - 错误消息
 */
export interface ApiError 
{
  code: string
  message: string
}