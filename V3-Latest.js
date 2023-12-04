const feedUrl = "/feeds/posts/default?alt=json&max-results=1000";
const links = [];

fetch(feedUrl)
  .then(response => response.json())
  .then(data => {
    links.push(...(data.feed.entry || []).map(entry => entry.link.find(link => link.rel === "alternate").href));
  })
  .catch(error => console.error("Error fetching Posts:"));
