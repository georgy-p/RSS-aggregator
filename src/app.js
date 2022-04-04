import _ from "lodash";
import onChange from "on-change";
import ru from "./locales/ru.js";
import * as rss from "./handles/rsshandle.js";
import * as r from "./handles/renderhandle.js";
import urlValidator from "./handles/urlValidator.js";




export default (state, i18nextInstance, elements) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === 'feedbackStatus') {
      if (value === 'downloaded') {
        r.renderFeedbackOk(i18nextInstance, elements);
      } else {
          const errorText = i18nextInstance.t(`feedback.errors.${value}`);
          r.renderFeedbackProblem(errorText, elements);
      }
    }
      if (path === 'content.feeds') {
        r.renderFeeds(value, i18nextInstance, elements);
      }
  
      if (path === 'content.posts') {
        r.renderPosts(value, watchedState.content.readed, i18nextInstance, elements);
      }
  
      if (path === 'modalId') {
        if (value !== null) {
          r.renderModal(value, elements);
        } else {
          r.closeModal(elements);
        }
      }
  });

  const postsContainer = elements.content.posts;
  postsContainer.addEventListener('click', (e) => {
  const currentPost = e.target;
    if (currentPost.type === 'button') {
      const postId = currentPost.dataset.id;
      const postData = _.find(watchedState.content.posts, { id: postId });
      const postTitle = postData.postTitle;
      watchedState.content.readed.push(postTitle);
      watchedState.modalId = postData;
    }
  });
  
  const modalContainer = elements.modal.mainDiv;
  modalContainer.addEventListener('click', (e) => {
    if (e.target.type === 'button') {
      watchedState.modalId = null;
    }
  });
  
    const formContainer = elements.form.formEl;
    formContainer.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const link = data.get('url');
      console.log(link);
      urlValidator(link, watchedState.content.links)
        .then(() => console.log(`try to get content with ${link}`))
        .then(() => {
          watchedState.content.links.push(link)
          rss.getContent(watchedState)
        })
        .then(() => watchedState.feedbackStatus = 'downloaded')
        .catch((e) => {
          if (e.isAxiosError) {
            watchedState.feedbackStatus = 'networkError';
          } else {
            watchedState.feedbackStatus = e.errors
          }
        })
      })
};

