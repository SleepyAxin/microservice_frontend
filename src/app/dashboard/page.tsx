// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import {
  Container,
  Title,
  Card,
  Text,
  Button,
  Group,
  Stack,
  Modal,
  TextInput,
  Textarea,
  Checkbox,
  ActionIcon,
  Grid,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconEdit, IconTrash, IconPlus, IconCalendar } from '@tabler/icons-react'
import { Task } from '@/app/types/task'
import { TaskService } from '@/app/service/task'
import { isAuthenticated } from '../utils/auth'

export default function DashboardPage() {
  // if (!isAuthenticated()) redirect('/auth')
  const [tasks, setTasks] = useState<Task[]>([])
  const [modalOpened, setModalOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const form = useForm<Task>({
    initialValues: {
      userId: 1, // 这里应该使用实际的用户ID
      title: '',
      description: '',
      dueDate: '',
      completed: false,
    },
    validate: {
      title: (value) => (value.trim().length < 1 ? '标题不能为空' : null),
      dueDate: (value) => (value ? null : '请选择截止日期'),
    },
  })

  const loadTasks = async () => {
    try {
      const fetchedTasks = await TaskService.getTasks(1) // 使用实际的用户ID
      setTasks(fetchedTasks)
    } catch (error) {
      notifications.show({
        title: '加载失败',
        message: '无法加载任务列表',
        color: 'red',
      })
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleSubmit = async (values: Task) => {
    setLoading(true)
    try {
      if (editingTask) {
        await TaskService.updateTask({ ...values, id: editingTask.id })
        notifications.show({
          title: '更新成功',
          message: '任务已更新',
          color: 'green',
        })
      } else {
        await TaskService.createTask(values)
        notifications.show({
          title: '创建成功',
          message: '新任务已创建',
          color: 'green',
        })
      }
      setModalOpened(false)
      loadTasks()
      form.reset()
      setEditingTask(null)
    } catch (error) {
      notifications.show({
        title: '操作失败',
        message: editingTask ? '更新任务失败' : '创建任务失败',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    form.setValues(task)
    setModalOpened(true)
  }

  const handleDelete = async (taskId: number) => {
    if (!confirm('确定要删除这个任务吗？')) return

    try {
      await TaskService.deleteTask(taskId)
      notifications.show({
        title: '删除成功',
        message: '任务已删除',
        color: 'green',
      })
      loadTasks()
    } catch (error) {
      notifications.show({
        title: '删除失败',
        message: '无法删除任务',
        color: 'red',
      })
    }
  }

  const handleToggleComplete = async (task: Task) => {
    try {
      await TaskService.updateTask({
        ...task,
        completed: !task.completed,
      })
      loadTasks()
    } catch (error) {
      notifications.show({
        title: '更新失败',
        message: '无法更新任务状态',
        color: 'red',
      })
    }
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>我的任务</Title>
        <Button
          leftSection={<IconPlus size={20} />}
          onClick={() => {
            form.reset()
            setEditingTask(null)
            setModalOpened(true)
          }}
        >
          新建任务
        </Button>
      </Group>

      <Grid>
        {tasks.map((task) => (
          <Grid.Col key={task.id} span={{ base: 12, sm: 6, lg: 4 }}>
            <Card withBorder shadow="sm" radius="md">
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="lg" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </Text>
                <Group gap="xs">
                  <ActionIcon variant="subtle" onClick={() => handleEdit(task)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(task.id!)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>
              
              <Text size="sm" c="dimmed" mb="md">
                {task.description}
              </Text>
              
              <Group justify="space-between" align="center">
                <Text size="sm" c="dimmed">
                  截止日期: {new Date(task.dueDate).toLocaleDateString()}
                </Text>
                <Checkbox
                  label="已完成"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                />
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false)
          setEditingTask(null)
          form.reset()
        }}
        title={editingTask ? '编辑任务' : '新建任务'}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="标题"
              placeholder="输入任务标题"
              {...form.getInputProps('title')}
            />

            <Textarea
              label="描述"
              placeholder="输入任务描述"
              {...form.getInputProps('description')}
            />

            <DateInput
              required
              label="截止日期"
              placeholder="请选择日期"
              value={form.values.dueDate ? new Date(form.values.dueDate) : null}
              onChange={(date) => form.setFieldValue('dueDate', date ? date.toISOString() : '')}
              minDate={new Date()}
              maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              rightSection={<IconCalendar size={16} />}
              clearable
              styles=
              {
                {
                  calendarHeaderControl: { width: '40px', height: '40px', fontSize: '14px' },
                }
              }
            />

            <Checkbox
              label="已完成"
              {...form.getInputProps('completed', { type: 'checkbox' })}
            />

            <Group justify="flex-end">
              <Button variant="subtle" onClick={() => setModalOpened(false)}>
                取消
              </Button>
              <Button type="submit" loading={loading}>
                {editingTask ? '更新' : '创建'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  )
}