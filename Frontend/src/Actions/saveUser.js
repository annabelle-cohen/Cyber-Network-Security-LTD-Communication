import { SAVE_USER } from "../Constant/action-types";

export function saveUser(payload) {
  return { type: SAVE_USER, payload };
}
