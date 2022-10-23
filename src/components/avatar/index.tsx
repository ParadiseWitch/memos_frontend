import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Avatar',
  props: {
    url: {
      type: String,
      default: '/public/assets/avatar.jpeg',
    },
  },
  setup(props) {
    return () => (
      <>
        <div class="w-24 h-24 rounded-full border-2 overflow-hidden">
            <img class="" src={props.url} alt="加载失败" title="用户头像"></img>
        </div>
      </>
    )
  },
})
