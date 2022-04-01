import { string } from "yup";
import _ from "lodash";
import onChange from "on-change";
import ru from "./locales/ru.js";
import * as rss from "./handles/rsshandle.js";
import * as r from "./handles/renderhandle.js";




export default (state, i18nextInstance, elements) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === 'feedbackStatus') {
      if (value === 'downloaded') {
        r.renderFeedbackOk(i18nextInstance, elements);
      } else {
        r.renderFeedbackProblem(value, elements);
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

  const schemaIsValid = string().url();
  const schemaHasDublicate = string().test(
    'has-dublicate',
    () => ru.translation.feedback.errors.dublicate,
    (value) => !watchedState.content.links.includes(value),
  );
  const schemaHasValidRss = string().test(
    'has-valid RSS',
    () => ru.translation.feedback.errors.notValidRss,
    (value) => rss.isValidRss(value),
  );

  const rssTimer = () => rss.getContent(watchedState).then(() => setTimeout(rssTimer, 5000));
  
    const formContainer = elements.form.formEl;
    formContainer.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const link = data.get('url');
      schemaIsValid.validate(link)
      .then(() => console.log('Dublicate validation'))
        .then(() => schemaHasDublicate.validate(link))
        .then(() => console.log('isValid rss validation'))
        .then(() => schemaHasValidRss.validate(link))
        .then(() => console.log('try to get content'))
        .then(() => {
          watchedState.content.links.push(link)
          rss.getContent(watchedState)
        })
        .then(() => console.log('change status'))
        .then(() => watchedState.feedbackStatus = 'downloaded')
        .then(() => console.log('try to set timer'))
        .then(() => setTimeout(rssTimer, 5000))
        .catch((e) => {
          console.log('Alarm!');
          console.log(e);
          watchedState.feedbackStatus = e.errors.join()
        })
      })
};

