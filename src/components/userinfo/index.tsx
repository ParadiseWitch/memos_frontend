import { defineComponent } from "vue";
import Avatar from "/@/components/avatar";
import "./index.css"
import DropDown from "../drop-down";

export default defineComponent({
  name: "UserInfo",
  setup(props) {
    const buttonSolt = <div class="">Maiiiiiid</div>
    return () => (
      <>
        <div class="flex justify-between">
          <div class="">
            <Avatar />
          </div>
          <div class="flex flex-col justify-between">
            <div class="flex justify-between px-2">
              <DropDown
                buttonSlot={ buttonSolt }
                data={[
                { label: "选项1", value: "" },
                { label: "选项2", value: "" },
                { label: "选项3", value: "" },
                { label: "选项4", value: "" },]}
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