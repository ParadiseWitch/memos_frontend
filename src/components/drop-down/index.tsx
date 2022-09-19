import { defineComponent, ref } from "vue";
import ClickOutside from "/@/utils/directives/clickOutSide"


export default defineComponent({
  name: "DropDown",
  directives: { ClickOutside },
  setup() {
    let isVisible = ref(true);
    let showDownList = ref(false);

    const handleClose = () => {
      console.log('close');
      showDownList.value = false;
    }

    const handleBtnClick = () => { 
      showDownList.value = true;
    }
    return () => (<>
      {isVisible.value && <div class="h-fit bg-red-200" v-click-outside={handleClose}>
        <div onClick={handleBtnClick}>下拉按钮</div>
        {showDownList.value && <div class="w-full h-20">列表</div>} 
      </div>}
    </>)
  }
})