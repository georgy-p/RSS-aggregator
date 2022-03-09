import onChange from "on-change";
import { elements } from "./init";

const state = {
  valid: null,
  feeds: [],
  feedbackStatus: '',
};

export const watchedState = onChange(state, (path) => {
  if (path === 'valid') {
    if (state.valid === false) {
      elements.form.formEl.inputEl.classList.add('is-invalid');
    } else {
      elements.form.formEl.classList.remove('is-invalid');
      elements.form.formEl.reset();
      elements.form.formEl.focus();
    }
  }
});