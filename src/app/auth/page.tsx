// app/auth/page.tsx
'use client'

import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Stack,
  Tabs,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import { LoginFormValues, RegisterFormValues, ApiError } from '@/app/types/auth'
import { AuthService } from '@/app/service/auth'
import { isAuthenticated, storeUserInfo } from '@/app/utils/auth'

export default function AuthPage() {
  // 检查用户是否已认证，如果是，则重定向到仪表板
  if (isAuthenticated()) {
    redirect('/dashboard')
  }

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>('login')

  const loginForm = useForm<LoginFormValues>({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) => (value.length < 2 ? '用户名至少需要2个字符' : null),
      password: (value) => (value.length < 6 ? '密码至少需要6个字符' : null),
    }
  })

  const registerForm = useForm<RegisterFormValues>({
    initialValues: {
      username: '',
      password: '',
      password_confirm: '',
    },
    validate: {
      username: (value) => (value.length < 2 ? '用户名至少需要2个字符' : null),
      password: (value) => (value.length < 6 ? '密码至少需要6个字符' : null),
      password_confirm: (value, values) => value !== values.password ? '两次输入的密码不匹配' : null,
    }
  })

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true)

    try {
      const data = await AuthService.login(values)

      storeUserInfo({
        id: data.id,
        username: data.username,
        password: data.password
      })

      notifications.show({
        title: '登录成功',
        message: `欢迎回来，${data.username}！`,
        color: 'green'
      })

      redirect('/dashboard')
    } catch (error) {
      notifications.show({
        title: '登录失败',
        message: error instanceof Error ? error.message : '请检查您的用户名和密码',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true)

    try {
      await AuthService.register(values)

      notifications.show({
        title: '注册成功',
        message: '请查看您的邮箱进行验证',
        color: 'green',
      })

      setActiveTab('login')
    } catch (error) {
      notifications.show({
        title: '注册失败',
        message: error instanceof Error ? error.message : '请稍后重试',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={600}>欢迎使用MyMemo备忘录</Title>
      <Text c="dimmed" size="md" ta="center" mt={5}>
        开发者： 陈金海 和 王鑫
      </Text>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {activeTab === 'login' ? '还没有账号？' : '已有账号？'}{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
        >
          {activeTab === 'login' ? '创建账号' : '立即登录'}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List grow mb="md">
            <Tabs.Tab value="login">登录</Tabs.Tab>
            <Tabs.Tab value="register">注册</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login">
            <form onSubmit={loginForm.onSubmit((values) => handleLogin(values))}>
              <Stack>
                <TextInput
                  required
                  label="用户名"
                  placeholder="您的用户名"
                  {...loginForm.getInputProps('username')}
                />

                <PasswordInput
                  required
                  label="密码"
                  placeholder="您的密码"
                  {...loginForm.getInputProps('password')}
                />

                <Button fullWidth loading={loading} type="submit">登录</Button>
              </Stack>
            </form>
          </Tabs.Panel>

          <Tabs.Panel value="register">
            <form onSubmit={registerForm.onSubmit((values) => handleRegister(values))}>
              <Stack>
                <TextInput
                  required
                  label="用户名"
                  placeholder="您的用户名"
                  {...registerForm.getInputProps('username')}
                />

                <PasswordInput
                  required
                  label="密码"
                  placeholder="您的密码"
                  {...registerForm.getInputProps('password')}
                />

                <PasswordInput
                  required
                  label="确认密码"
                  placeholder="确认您的密码"
                  {...registerForm.getInputProps('password_confirm')}
                />

                <Checkbox
                  label="我同意服务条款和隐私政策"
                  {...registerForm.getInputProps('terms', { type: 'checkbox' })}
                />

                <Button fullWidth loading={loading} type="submit">注册</Button>
              </Stack>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Container>
  )
}