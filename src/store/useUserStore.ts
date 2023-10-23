const { currentUser } = useUser();
export default defineStore('user', {
  state: () => {
    return {
      user: undefined as UserModel | undefined,
      role: undefined,
    };
  },
  getters: {
    isAdministrator: state => state.role === 'admin',
  },
  actions: {
    setUser(data: any) {
      this.user = data;
    },
    async getCurrentUser() {
      if (useAuth().isLogin()) {
        const {
          data,
          body: { role },
        } = await currentUser();
        this.user = data;
        this.role = role;
      }
    },
  },
});
