import Vue from "vue";

export default function setup() {
  Vue.directive("popupWindow", {
    bind(el, binding, vnode) {
      el.addEventListener("click", (event) => {
        event.stopPropagation();
        const popupWindow = vnode.context!.$refs["popupWindow"] as any; //придумать другой вариант
        const popupWidth = popupWindow.$el.offsetWidth;
        const popupHeight = popupWindow.$el.offsetHeight;
        let left = event.pageX;
        let top = event.pageY;
        if (document.documentElement.clientWidth < event.pageX + popupWidth) {
          left = event.pageX - popupWidth;
        }
        if (document.documentElement.clientHeight < event.pageY + popupWidth) {
          top = event.pageY - popupHeight;
        }
        popupWindow.mode = binding.arg;
        popupWindow.data = binding.value;
        popupWindow.left = left + "px";
        popupWindow.top = top + "px";
        popupWindow.zIndex = 10;
        popupWindow.opacity = 1;
      });
    },
  });
}
