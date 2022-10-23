import { MaybeComputedRef, useFetch, UseFetchOptions } from '@vueuse/core'
import { Ref } from 'vue'
import { useToast } from '/@/components/toast/'
import { useGlobalState } from '../stage'
type ReturnType<D extends any> = SuccReturnType<D> | FailReturnType

type SuccReturnType<D extends any> = {
  status: 'success'
  data: D
}

type FailReturnType = {
  status: 'fail'
  msg: string
}

const useRequest = <D extends any>() => {
  let res: Ref<ReturnType<D> | null>
  let error: Ref<any>
  return {
    request (
      url: MaybeComputedRef<string>,
      useFetchOptions: UseFetchOptions = {}
    ) {
      const baseURI = '/api/v1'
      const rset = useFetch<ReturnType<D>>(baseURI + url, {
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
      succ: (params: {
        res: Ref<SuccReturnType<D>>
        error: Ref<any>
      }) => void,
      fail?: <T extends ReturnType<D> | null>(param: {
        res: Ref<T>
        error: Ref<any>
      }) => void
    ) {
      if (res.value == null) {
        useToast('请求后台失败，无返回数据', { type: 'warn' }).show()
        fail && fail({ res, error })
        return
      }

      if (error.value) {
        useToast('前台请求失败', { type: 'warn' }).show()
        fail && fail({ res, error })
        return
      }
      if (!['fail', 'success'].includes(res.value.status)) {
        useToast('请求异常', { type: 'warn' }).show()
        fail && fail({ res, error })
        return
      }
      if ('fail' === res.value.status) {
        useToast(res.value.msg, { type: 'warn' }).show()
        fail && fail<FailReturnType>({ res: res as Ref<FailReturnType>, error })
        return
      }
      succ({ res: res as Ref<SuccReturnType<D>>, error })
    }
  }
}

export default useRequest
