import Cookies from 'js-cookie'
import man from "@plugins/man";

const TokenKey = 'Admin-Token'
const UserKey = 'username'
const userId = 'userId'

export function getToken() {
  return man.cookies.get('token')
}

export function getUsername() {
  return Cookies.get(UserKey)
}

export function getUserId(){
    return Cookies.get(userId)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setUsername(username) {
   return Cookies.set(UserKey, username)
}

export function removeToken() {
  Cookies.remove(UserKey);
  return Cookies.remove(TokenKey)
}
