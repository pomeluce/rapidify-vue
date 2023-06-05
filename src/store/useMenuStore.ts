export default defineStore('menu', () => {
  const menuState = ref<boolean>(true);

  const toggleMenu = () => {
    menuState.value = !menuState.value;
  };

  return { menuState, toggleMenu };
});
