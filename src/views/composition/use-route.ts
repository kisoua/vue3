import routeContext from '@ant-design/pro-layout/lib/RouteContext'
import { getCurrentInstance } from 'vue'

export function useRoute() {
  const vm = getCurrentInstance()?.proxy
  return () => {
    routeContext
  }
}
