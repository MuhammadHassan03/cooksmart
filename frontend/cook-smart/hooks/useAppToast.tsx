import { useToastController } from '@tamagui/toast'

export const useAppToast = () => {
  const toast = useToastController()

  const showToast = (
    title: string,
    description?: string,
    preset: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 5000
  ) => {
    toast.show(title, {
      message: description,
      duration,
      customData: { preset },
    })
  }

  return {
    showSuccess: (msg: string, desc?: string) => showToast(msg, desc, 'success'),
    showError: (msg: string, desc?: string) => showToast(msg, desc, 'error'),
    showInfo: (msg: string, desc?: string) => showToast(msg, desc, 'info'),
    showWarning: (msg: string, desc?: string) => showToast(msg, desc, 'warning'),
  }
}