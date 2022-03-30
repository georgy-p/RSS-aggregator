import i18next from "i18next";
import onChange from "on-change";
import { state, elements } from "./init.js";
import * as r from "./renderhandle.js";



export const watchedState = onChange(state, (path, value) => {
  if (path === 'feedbackStatus') {
    if (value === 'downloaded') {
      r.renderFeedbackOk();
    } else {
      r.renderFeedbackProblem(value);
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
