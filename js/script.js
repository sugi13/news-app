let homeContainer = document.querySelector("#home-news-container");
let searchContainer = document.querySelector("#search-news-container");
let key = "iIFPcmGeikkI9J7AZff042qHe0V9kb21";
let inputText = document.getElementById("search-field");
let searchButton = document.getElementById('search');
let themeChange = document.querySelector(".theme");
let HomeContent = document.getElementById('home');

HomeContent.style.display = "none";


/* for while rendering page */
function fetchData(){
  fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${key}`)
  .then((response) =>{
    return response.json();
  })
  .then((data) =>{
   appendData(data);
  })
}
function appendData(data){
  for(let article of data.results){
    homeContainer.innerHTML += 
    `<div id = "content">
    <div class = "img">
    <img src = ${article.multimedia[1].url} type = ${article.type}/>
    </div>
    <div class = "content-data">
    <h4>${article.title}</h4>
    <span> <ion-icon name="person-circle-outline" id = "person"></ion-icon> ${article.byline}</span>
    <p>${article.abstract}</p>
    <a href = ${article.short_url}>Read More <ion-icon name="book-outline"></ion-icon></a>
    </div>
    </div>`
  }
}
document.addEventListener('DOMContentLoaded', fetchData);

// search article //
async function searchArticle(){
  fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${inputText.value}&api-key=${key}`)
  .then((response)=>{
   return response.json();
  })
  .then((data)=>{
    searchContent(data);
  })
}
function searchContent(data){
  for(let searchData of data.response.docs){
    searchContainer.innerHTML += 
      `<div id = "search-content">
      <h3>${searchData.headline.main}</h3>
      <span> <ion-icon name="person-circle-outline" id = "person"></ion-icon>${searchData.byline.original}</span>
      <p>${searchData.snippet}</p>
      <a href = ${searchData.web_url}>Read More <ion-icon name="book-outline"></ion-icon></a>
      </div>`
  }
  document.body.removeChild(homeContainer);
  HomeContent.style.display = "block";
  inputText.value = "";
}
searchButton.addEventListener("click", searchArticle);

// function toggleTheme

function toggleTheme(){
  document.body.classList.toggle("darkTheme");
  if(document.body.classList.contains("darkTheme")){
    themeChange.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
     homeContainer.childNodes.forEach(node => {
      node.style.background = "#040404";
      node.style.borderBottom = "1px solid #545454";
    })
    searchContainer.childNodes.forEach(node => {
      node.style.background = "#040404";
      node.style.borderBottom = "1px solid #545454";
    })
  }
  else{
    themeChange.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    homeContainer.childNodes.forEach(node => {
      node.style.background = "#f9f9f9";
      node.style.borderBottom = "1px solid #f9f9f9"
    })
    searchContainer.childNodes.forEach(node => {
      node.style.background = "#f9f9f9";
      node.style.borderBottom = "1px solid #f9f9f9";
    })
  }
}
themeChange.addEventListener("click", toggleTheme);

// return to Home //

function returnToHome(){
  document.body.removeChild(searchContainer);
  document.body.appendChild(homeContainer);
  HomeContent.style.display = "none";
  location.reload();
}
HomeContent.addEventListener("click", returnToHome);
