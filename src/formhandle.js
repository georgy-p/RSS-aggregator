import { string, } from "yup";
import _ from "lodash";
import rssHandle from "./rsshandle.js";
import { watchedState } from "./render.js";
import ru from "./locales/ru.js";
import { elements } from "./init.js";

const schemaIsValid = string().url();
const schemaHasDublicate = string().test(
  'has-dublicate',
  () => ru.translation.feedback.errors.dublicate,
  (value) => !watchedState.content.links.includes(value),
);
export default () => {
  const formContainer = elements.form.formEl;
  formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const link = data.get('url');
    schemaIsValid.validate(link)
      .then(() => schemaHasDublicate.validate(link))
      .then(() => {      
        console.log('Done!');
        watchedState.content.links.push(link);
        rssHandle();
        })
      .catch((e) => {    
        console.log('ALARM!');
        //console.log(e.errors);
        watchedState.feedbackError = e.errors.join();
      })
    });
  
  const postsContainer = elements.content.posts;
  postsContainer.addEventListener('click', (e) => {
    const currentPost = e.target;
    if (currentPost.type === 'button') {
      const postId = currentPost.dataset.id;
      const postData = _.find(watchedState.content.posts, { id: postId });
      watchedState.modalId = postData;
    }
  });

  const modalContainer = elements.modal.mainDiv;
  modalContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.type === 'button') {
      watchedState.modalId = null;
    }
  });

};
