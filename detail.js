document.addEventListener("DOMContentLoaded", function () {
  function getDynamicParts() {
    const queryString = window.location.search;
    const dynamicParts = queryString.substring(1).split("/");
    return dynamicParts;
  }
  const [categoryName, articlId] = getDynamicParts();
  fetch(
    `https://apisitem.ecommcube.com/api/public/industry_template_data/65f0aa0e87406689f2ece77c/661e433e5ef9ee4c88efc8b7/data/${articlId}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayData(data.data[0]);
      displayBanner(data.data[0]);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  fetch(
    "https://apisitem.ecommcube.com/api/public/industry_template_data/65f0aa0e87406689f2ece77c/661e433e5ef9ee4c88efc8b7/data/logo"
  )
    .then((response) => response.json())
    .then((data) => {
      displayLogo(data.data[0]);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  fetch(
    "https://apisitem.ecommcube.com/api/public/industry_template_data/65f0aa0e87406689f2ece77c/661e433e5ef9ee4c88efc8b7/data/blog_list"
  )
    .then((response) => response.json())
    .then((data) => {
      generateLatestPosts(data.data[0]).value;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
function displayLogo(logo) {
  const container = document.getElementById("logo");
  container.innerHTML = "";
  const logoImg = document.createElement("img");
  logoImg.src = `https://apisitem.ecommcube.com/images/industry_template_images/661e433e5ef9ee4c88efc8b7/${logo.file_name}`;
  logoImg.alt = "Logo";
  container.appendChild(logoImg);
}

function displayBanner(bannerData) {
  console.log("bannerData", bannerData);
  const container = document.getElementById("banner");
  container.innerHTML = "";

  const bannerImg = document.createElement("img");
  bannerImg.src = `https://apisitem.ecommcube.com/images/industry_template_images/661e433e5ef9ee4c88efc8b7/${bannerData?.file_name}`;
  bannerImg.alt = "BackgroundBanner";
  bannerImg.setAttribute("fetchpriority", "high");
  bannerImg.setAttribute("loading", "eager");
  bannerImg.setAttribute("decoding", "async");
  bannerImg.setAttribute("data-nimg", "fill");
  bannerImg.classList.add("banner-img");
  container.appendChild(bannerImg);

  const bannerContainer = document.createElement("div");
  bannerContainer.classList.add("banner-container");

  const badge = document.createElement("div");
  badge.classList.add("badge");
  badge.textContent = "";
  bannerContainer.appendChild(badge);

  const title = document.createElement("h1");
  title.textContent = bannerData?.value?.title;
  title.style.width = "768px";
  bannerContainer.appendChild(title);

  const tagline = document.createElement("p");
  tagline.textContent = bannerData?.value?.tagline;
  bannerContainer.appendChild(tagline);

  container.appendChild(bannerContainer);
}

function displayData(content) {
  const container = document.getElementById("data-container-detail");
  const heading = document.createElement("h1");
  const nextHeading = document.createElement("h4");
  const publishedDate = new Date(content?.value?.published_at);
  // Format the date into "dd MMM, yyyy" format
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  nextHeading.innerHTML = `${content?.value?.title} | by ${content?.value?.author} | ${formattedDate}`;
  const paragraph = document.createElement("p");
  heading.textContent = "";
  paragraph.textContent = content?.value?.articleContent;
  container.innerHTML = "";
  const hrTag = document.createElement("hr");
  container.appendChild(heading);
  container.appendChild(nextHeading);
  container.appendChild(paragraph);
  container.appendChild(hrTag);
}

function createPostBox(post) {
    const postBox = document.createElement("a"); 
    postBox.href = `./detail.html?${post?.article_category?.name}/${post?.key}`;
    postBox.classList.add("post-box");
    const image = document.createElement("img");
    image.src = `https://apisitem.ecommcube.com/images/industry_template_images/661e433e5ef9ee4c88efc8b7/${post?.image}`;
    postBox.appendChild(image);
    const text = document.createElement("p");
    text.textContent = post?.articleContent.slice(0, 100);
    postBox.appendChild(text);
  
    return postBox;
}

function generateLatestPosts(posts) {
  const latestPostsContainer = document.getElementById(
    "latest-posts-container"
  );
  latestPostsContainer.innerHTML = "";
  const heading = document.createElement("h2");
  heading.textContent = "Latest Posts";
  heading.classList.add("font-bold", "text-3xl", "bg-white", "px-6");
  latestPostsContainer.appendChild(heading);
  // Create post boxes and append them to the container
  posts?.value.forEach((post) => {
    const postBox = createPostBox(post);
    latestPostsContainer.appendChild(postBox);
  });
}
