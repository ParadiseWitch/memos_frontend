import { useFetch } from "@vueuse/core"
import useToast from "../components/toast/use-toast";

const useRequest = (url: string) => {
  const { error, ...ret } = useFetch(url)
  const handleError = () => {
    if (error.value) {
      useToast().show("请求失败", { type: "warn" });
      return;
    }
  }
  return { ...ret }
}