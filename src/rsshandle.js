import _ from "lodash";
import axios from "axios";
import { watchedState } from "./render.js";

let fullFeeds = [];
let fullPosts = [];
let downloadedData = [];

const parse = (rawRss) => {
  const parser = new DOMParser();
  const rss = parser.parseFromString(rawRss, 'text/xml');
  const feedTitle = rss.querySelector('title').textContent;
  const feedDescription = rss.querySelector('description').textContent;
  const posts = rss.querySelectorAll('item');
  const preparedFeed = { feedTitle, feedDescription };
  fullFeeds.push(preparedFeed);
  posts.forEach((post) => {
    const id = _.uniqueId();
    const postTitle = post.querySelector('title').textContent;
    const postLink = post.querySelector('link').textContent;
    const postDescription = post.querySelector('description').textContent;
    const preparedPost = { id, postTitle, postLink, postDescription };
    fullPosts.push(preparedPost);
  });
}



const getContent = () => {
  const links = watchedState.content.links;
  const contentData = [];
  links.map((link) => {
    const originLink = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(`${link}`)}`;
    contentData.push(axios.get(originLink)
      .then((response) => downloadedData.push({link, response: response.data.contents})));
  });

  Promise.all(contentData).then(() => {
    downloadedData.sort((a, b) => links.indexOf(a.link) - links.indexOf(b.link))
      .forEach((link) => parse(link.response));
    watchedState.content.feeds = fullFeeds;
    watchedState.content.posts = fullPosts;
    fullFeeds = [];
    fullPosts = [];
    downloadedData = [];
  })
};

export default () => {
  getContent();
};