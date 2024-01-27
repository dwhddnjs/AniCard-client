"use client"

import { create } from "zustand"

export interface useIsLoginTypes {
  isLogin: boolean
  setIsLogin: (state: boolean) => void
}

export const useIsLogin = create<useIsLoginTypes>((set, get) => ({
  isLogin: false,
  setIsLogin: (state: boolean) => set({ isLogin: state }),
}))
