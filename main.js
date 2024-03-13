const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector(".search-box");
const searchResult = document.querySelector(".search-result");
const ShowMoreBtn = document.querySelector(".show-more-btn");

let acsessKey = "oGhzrVLzsxXOZMihWZ2u2WJJAS8c1ojTwty0SCYYYvU";
let keyword = ""; //the value in input (search)
let page = 1;
let perPage = 9;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${keyword}&client_id=${acsessKey}`;

  // (await) ===>pause execution of function until the promise returned by response.json() is resolved,make sure code inside the function doesn't execute until the JSON data is available.
  const response = await fetch(url);

  // to return data as object
  const data = await response.json();
  console.log(data);

  if (page === 1) {
    searchResult.innerHTML = ""; //delete the images so ather page can appear
  }

  const results = data.results;

  results.map((results) => {
    const image = document.createElement("img");
    image.src = results.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = results.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image); //image inside <a>
    searchResult.appendChild(imageLink); //appened to parent div
  });

  ShowMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

ShowMoreBtn.addEventListener("click", (e) => {
  page++;
  searchImages();
});
