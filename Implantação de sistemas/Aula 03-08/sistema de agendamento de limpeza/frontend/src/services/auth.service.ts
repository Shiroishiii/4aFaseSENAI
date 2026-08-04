import { api } from './api'
import type { Usuario } from '../types'

export const authService = {
  login: async (email: string, senha: string) => (await api.post<{ token: string; user: Usuario }>('/auth/login', { email, senha })).data,
  me: async () => (await api.get<{ user: Usuario }>('/auth/me')).data.user,
}
