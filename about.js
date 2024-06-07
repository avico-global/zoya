document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://apisitem.ecommcube.com/api/public/industry_template_data/65f0aa0e87406689f2ece77c/661e433e5ef9ee4c88efc8b7/data/about_me"
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
  title.textContent = "About Us";
  bannerContainer.appendChild(title);

  const tagline = document.createElement("p");
  tagline.textContent = bannerData?.value?.tagline;
  bannerContainer.appendChild(tagline);

  container.appendChild(bannerContainer);
}

function displayData(content) {
  const container = document.getElementById("data-container-about");
  const heading = document.createElement("h1");
  const paragraph = document.createElement("p");
  heading.textContent = "About Us";
  paragraph.textContent = content?.value;
  container.innerHTML = "";
  container.appendChild(heading);
  container.appendChild(paragraph);
}
