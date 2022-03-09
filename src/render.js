import onChange from "on-change";
import { state, elements } from "./init.js";



export const watchedState = onChange(state, (path) => {
  if (path === 'valid') {
    if (state.valid === false) {
      elements.form.inputEl.classList.add('is-invalid');
    } else {
      elements.form.inputEl.classList.remove('is-invalid')
    }
      elements.form.formEl.reset();
      elements.form.formEl.focus();
  }
});