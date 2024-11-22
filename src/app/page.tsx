// app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() 
{
  // 可以在这里进行服务端重定向
  redirect('/dashboard')
}