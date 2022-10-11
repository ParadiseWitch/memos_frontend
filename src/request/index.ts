import { MaybeComputedRef, useFetch, UseFetchOptions } from "@vueuse/core"
import { Ref } from "vue";
import useToast from "../components/toast/use-toast";
import { useGlobalState } from "../stage";
interface ReturnType {
  status: "fail" | "success",
  data?: any,
  msg?: "",
}
const useRequest = <T extends ReturnType>() => {
  let data: Ref<T | null>
  let error: Ref<any>
  return {
    request(url: MaybeComputedRef<string>, useFetchOptions: UseFetchOptions = {}) {
      const baseURI = "/api/v1"
      const rset = useFetch<T>(baseURI + url, {
        ...useFetchOptions,
        beforeFetch({ url, options, cancel }) {
          const { token } = useGlobalState();
          if (!token && url != "/api/v1/user/login") {
            cancel()
          }
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token.value}`,
          }
        },
      })
      data = rset.data
      error = rset.error
      return rset
    },
    handleReqResult(
      succ: (params: { data: Ref<T>, error: Ref<any> }) => void,
      fail?: (param: { data: Ref<T | null>, error: Ref<any> }) => void) {
      if (error.value || !data.value) {
        useToast("请求失败", { type: "warn" }).show();
        fail && fail({ data, error });
        return
      }
      data.value = data.value as T
      if (!['fail', "success"].includes(data.value.status)) {
        useToast("请求异常", { type: "warn" }).show();
        fail && fail({ data, error });
        return
      }
      if ('fail' === data.value.status) {
        useToast(data.value.msg, { type: "warn" }).show();
        fail && fail({ data, error });
        return
      }
      succ({ data: data as Ref<T>, error })
    },
  }
}


export default useRequest