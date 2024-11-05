// Utilities
import { defineStore } from 'pinia'

interface FbUser {
  user: {
    uid: string | boolean
  }
}

interface UserContact {
  firstName: string,
  lastName: string,
  position: string,
  email: string,
  corporatePhoneNumber: string,
}

export const useAppStore = defineStore('app', {
  state: () => ({
    empId: '',
    token: '',
    customToken: '',
    isAuthorized: false,
    fbUser: null as FbUser | null,
    isAdmin: false,
    userContact: null as UserContact | null,
    warning: false,
    users: [] as any,
    safeMode: false,
  }),
  actions: {
    // eslint-disable-next-line space-before-function-paren
    addempId(empId: string) {
      this.empId = empId
    },
    // eslint-disable-next-line space-before-function-paren
    updateIsAuthorized(isAuthorized: boolean) {
      this.isAuthorized = isAuthorized
    },
  },
})
