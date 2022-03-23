import { elements } from "./init.js";

const getPostsContainer = () => {
  const divBorder = document.createElement('div')
  divBorder.classList.add('card', 'border-0');
  const divCardHeader = document.createElement('div')
  divCardHeader.classList.add('card-body');
  divCardHeader.innerHTML = '<h2 class="card-title h4">Посты</h2>';
  divBorder.append(divCardHeader);
  return divBorder;
};

const getPostContent = (post) => {
  const { id, postTitle, postLink } = post;
  const liEl = document.createElement('li');
  liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  const aEl = document.createElement('a');
  const buttonEl = document.createElement('button');

  aEl.setAttribute('href', postLink);
  aEl.classList.add('fw-bold');
  aEl.setAttribute('data-id', id);
  aEl.setAttribute('target', '_blank');
  aEl.setAttribute('rel', 'noopener noreferrer');
  aEl.textContent = postTitle;
  buttonEl.setAttribute('type', 'button');
  buttonEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  buttonEl.setAttribute('data-id', id);
  buttonEl.setAttribute('data-bs-toggle', 'modal');
  buttonEl.setAttribute('data-bs-target', '#modal');
  buttonEl.textContent = 'Просмотр';
  liEl.append(aEl);
  liEl.append(buttonEl);
  return liEl;
};

export const renderPosts = (posts) => {
  const postsEl = elements.content.posts;
  postsEl.innerHTML = '';
  const postsContainer = getPostsContainer();
  const postsList = document.createElement('ul')
  postsList.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach((post) => {
    const liEl = getPostContent(post);
    postsList.append(liEl);
  });
  postsContainer.append(postsList);
  postsEl.append(postsContainer);
}

const getFeedsBar = () => {
  const divBorder = document.createElement('div');
  divBorder.classList.add('card', 'border-0');
  const divBody = document.createElement('div');
  divBody.classList.add('card-body');
  const h2El = document.createElement('h2');
  h2El.classList.add('card-title', 'h4');
  h2El.textContent = 'Фиды';
  divBody.append(h2El);
  divBorder.append(divBody);
  return divBorder;
}

const getFeedContent = (feed) => {
  const { feedTitle, feedDescription } = feed;
  const liEl = document.createElement('li');

  liEl.classList.add('list-group-item', 'border-0', 'rounded-0');
  const h3El = document.createElement('h3');
  h3El.classList.add('h6', 'm-0');
  h3El.textContent = feedTitle;
  const pEl = document.createElement('p');
  pEl.classList.add('m-0', 'small', 'text-black-50');
  pEl.textContent = feedDescription;
  liEl.append(h3El, pEl);
  return liEl;
}

export const renderFeeds = (feeds) => {
  const feedsEl = elements.content.feeds;
  feedsEl.innerHTML = '';
  const feedsContainer = getFeedsBar();
  const feedsList = document.createElement('ul')
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.forEach((feed) => {
    const liEl = getFeedContent(feed);
    feedsList.append(liEl);
  });
  feedsContainer.append(feedsList);
  feedsEl.append(feedsContainer);
}

export const renderModal = (postData) => {
  const { id, postTitle, postLink, postDescription } = postData;
  const bodyEl = elements.bodyEl;
  bodyEl.classList.add('modal-open');
  bodyEl.setAttribute('style', 'overflow: hidden; padding-right: 0px;');
  const newDiv = document.createElement('div');
  newDiv.classList.add('modal-backdrop', 'fade', 'show');
  bodyEl.append(newDiv);

  const modalDiv = elements.modal.mainDiv;
  modalDiv.classList.add('show');
  modalDiv.setAttribute('style', 'display: block');
  modalDiv.setAttribute('aria-modal', 'true');
  modalDiv.removeAttribute('aria-hidden');

  const postEl = document.querySelector(`[data-id="${id}"]`);
  postEl.classList.remove('fw-bold');
  postEl.classList.add('fw-normal', 'link-secondary');

  elements.modal.header.textContent = postTitle;
  elements.modal.body.textContent = postDescription;
  const linkEl = elements.modal.link;
  linkEl.setAttribute('href', postLink);
}

export const closeModal = () => {
  const bodyEl = elements.bodyEl;
  bodyEl.classList.remove('modal-open');
  bodyEl.setAttribute('style', '');

  const modalDiv = elements.modal.mainDiv;
  modalDiv.classList.remove('show');
  modalDiv.removeAttribute('aria-modal');
  modalDiv.setAttribute('style', 'display: none;');
  modalDiv.setAttribute('aria-hidden', 'true');

  const newDivEl = document.querySelector('.modal-backdrop');
  newDivEl.remove();
}