// services/auth.ts
import { LoginFormValues, RegisterFormValues, AuthResponse, ApiError } from '@/app/types/auth'

/**
 * 用户认证服务
 * @module services/auth
 * @description 此模块用于用户的认证服务
 */
export class AuthService
{
    /**
     * API 基础路径
     */
    private static readonly API_BASE = '/api/auth'

    /**
     * 登录函数
     * @param values 登录表单的值
     * @returns 登录成功后的用户信息
     */
    static async login(values: LoginFormValues): Promise<AuthResponse> 
    {
        const response = await fetch
        (
            `${this.API_BASE}/login`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }
        )

        if (!response.ok) 
        {
            const error = await response.json() as ApiError
            throw new Error(error.message)
        }

        return response.json()
    }

    /**
     * 注册函数
     * @param values 注册表单的值
     */
    static async register(values: RegisterFormValues): Promise<void> 
    {
        const response = await fetch
        (
            `${this.API_BASE}/register`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            }
        )

        if (!response.ok) 
        {
            const error = await response.json() as ApiError
            throw new Error(error.message)
        }
    }

    /**
     * 登出函数
     */
    static async logout(): Promise<void> 
    {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-info')
    }
}