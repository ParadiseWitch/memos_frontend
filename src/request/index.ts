import { MaybeComputedRef, useFetch, UseFetchOptions } from '@vueuse/core'
import { Ref } from 'vue'
import { useToast } from '/@/components/toast/'
import { useGlobalState } from '../stage'
type ReturnType = SuccReturnType | FailReturnType

type SuccReturnType = {
  status: 'success'
  data: any
}

type FailReturnType = {
  status: 'fail'
  msg: ''
}

const useRequest = <T extends ReturnType>() => {
  let res: Ref<T | null>
  let error: Ref<any>
  return {
    request (
      url: MaybeComputedRef<string>,
      useFetchOptions: UseFetchOptions = {}
    ) {
      const baseURI = '/api/v1'
      const rset = useFetch<T>(baseURI + url, {
        ...useFetchOptions,
        beforeFetch ({ url, options, cancel }) {
          const { token } = useGlobalState()
          if (
            !token &&
            !['/api/v1/user/login', '/api/v1/user/regist'].includes(url)
          ) {
            cancel()
          }
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token.value}`
          }
        }
      })
      res = rset.data
      error = rset.error
      return rset
    },
    handleReqResult (
      succ: (params: { res: Ref<T>; error: Ref<any> }) => void,
      fail?: (param: { res: Ref<T | null>; error: Ref<any> }) => void
    ) {
      if (error.value || !res.value) {
        useToast('请求失败', { type: 'warn' }).show()
        fail && fail({ res, error })
        return
      }
      res.value = res.value as T
      if (!['fail', 'success'].includes(res.value.status)) {
        useToast('请求异常', { type: 'warn' }).show()
        fail && fail({ res, error })
        return
      }
      if ('fail' === res.value.status) {
        useToast(res.value.msg, { type: 'warn' }).show()
        fail && fail({ res, error })
        return
      }
      succ({ res: res as Ref<T>, error })
    }
  }
}

export default useRequest
