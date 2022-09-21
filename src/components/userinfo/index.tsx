import { defineComponent } from "vue";
import Avatar from "/@/components/avatar";
import "./index.css"
import DropDown from "../drop-down";

export default defineComponent({
  name: "UserInfo",
  setup(props) {
    const getbuttonSolt = () =>
      <div class="text-2xl text-gray-600 font-bold">
        Maiiiiiid
        <i class="font-thin text-gray-300 text-sm pl-2 relative bottom-2px" style="line-height: 32px;">▼</i>
      </div>
    return () => (
      <>
        <div class="flex justify-between">
          <div class="">
            <Avatar />
          </div>
          <div class="flex flex-col justify-between">
            <div class="flex justify-between px-2">
              <DropDown
                buttonSlot={getbuttonSolt()}
                data={[
                  { label: "账号详情", value: "" },
                  { label: "消息通知", value: "" },
                  { label: "API & 插件", value: "" },
                  { label: "帮助教程", value: "" },]}
                onSelect={(e) => { console.log(e) }} />
              <i></i>
            </div>
            <div class="flex justify-between">
              <div class="info-text-container">
                <div class="info-text-num">304</div>
                <div class="info-text-name">Memos</div>
              </div>
              <div class="info-text-container">
                <div class="info-text-num">34</div>
                <div class="info-text-name">Tags</div>
              </div>
              <div class="info-text-container">
                <div class="info-text-num">304</div>
                <div class="info-text-name">Days</div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
})