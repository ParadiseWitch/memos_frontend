import { defineComponent } from 'vue'
import Avatar from '/@/components/avatar'
import './index.css'
import DropDown from '../drop-down'

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const getbuttonSolt = () =>
      <div class="text-2xl text-gray-600 flex">
        <span class="truncate w-40 inline-block break-all">Maiiiiiidssssssssssssssssssssssssssss</span>
        <svg class="ml-4 mt-2.5 stroke-current text-gray-500" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-5c29c1f2="" d="M3.71484 4.75L2.96484 5.5L6 8.53516L9.03516 5.5L8.28516 4.75L6 7.03516L3.71484 4.75Z"></path></svg>
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
                  { label: '账号详情', value: '' },
                  { label: '消息通知', value: '' },
                  { label: 'API & 插件', value: '' },
                  { label: '帮助教程', value: '' }]}
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
  },
})
