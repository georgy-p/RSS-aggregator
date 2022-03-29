import onChange from "on-change";
import { state, elements } from "./init.js";
import ru from "./locales/ru.js";
import * as r from "./renderhandle.js";



export const watchedState = onChange(state, (path, value) => {
  if (path === 'feedbackStatus') {
    if (value === 'downloaded') {
      elements.form.inputEl.classList.remove('is-invalid');
      elements.feedbackEl.classList.remove('text-danger');
      elements.feedbackEl.classList.add('text-success');
      elements.feedbackEl.textContent = ru.translation.feedback.success;
      elements.form.formEl.reset();
      elements.form.formEl.focus();
    } else {
      elements.form.inputEl.classList.add('is-invalid'); 
      elements.feedbackEl.classList.add('text-danger');
      elements.feedbackEl.textContent = value;
      elements.form.formEl.focus();
    }
  }

    if (path === 'content.feeds') {
      r.renderFeeds(value);
    }

    if (path === 'content.posts') {
      r.renderPosts(value);
    }

    if (path === 'modalId') {
      if (value !== null) {
        r.renderModal(value);
      } else {
        r.closeModal(value);
      }
    }
});
