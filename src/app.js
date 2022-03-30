import { i18nextInit, elements } from "./init.js";
import { string, } from "yup";
import _ from "lodash";
import * as rss from "./rsshandle.js";
import { watchedState } from "./render.js";
import ru from "./locales/ru.js";

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

const rssTimer = () => rss.getContent().then(() => setTimeout(rssTimer, 5000));

const containerHandle = () => {
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
      return schemaIsValid.validate(link)
        .then(() => schemaHasDublicate.validate(link))
        .then(() => schemaHasValidRss.validate(link))
        .then(() => {
          watchedState.content.links.push(link)
          rss.getContent()
        })
        .then(() => watchedState.feedbackStatus = 'downloaded')
        .then(() => setTimeout(rssTimer, 5000))
        .catch((e) => watchedState.feedbackStatus = e.errors.join())
      });
};

export default () => {
  i18nextInit()
  .then(() => containerHandle())
  .catch((e) => watchedState.feedbackStatus = e.errors.join())
};

