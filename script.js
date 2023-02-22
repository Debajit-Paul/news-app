// API key : 597932d351b44a3b95ee56a78489f7a6

const headlineList = document.getElementById("headline-list");
const inputSearch = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchNewslist = document.getElementById("searchNews-list");
let searchHeader = document.getElementById("search-Header");

window.onload = () => {
    getTopHeadline();
  }

  const fetchNews = (url,showNews) => {
    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json() ;
        }else{
            throw new Error ("Something is Wrong");
        }
    })
    .then(data => {
        console.log(data);
        showNews(data.articles)
    })
  }

  const searchNews =data =>{
    
    searchHeader.innerText = `Search Result: ${inputSearch.value}`;

    while(searchNewslist.hasChildNodes()){
        searchNewslist.removeChild(searchNewslist.firstChild);
    }
    for(let news of data){
        // create <li></li>
        let newsList = document.createElement("li");
        newsList.classList.add("news-item");
        searchNewslist.appendChild(newsList);
        // create <div></div>
        let newDiv = document.createElement("div");
        newDiv.className = "news"
        newDiv.style.background = `url("${news.urlToImage}")rgba(0,0,0,0.7)`;
        newDiv.style.backgroundSize = "cover";
        newsList.appendChild(newDiv);
        let newsHeading = document.createElement("h4");
        newsHeading.className = "news-heading";
        newsHeading.innerText = `${news.title}`;
        newDiv.appendChild(newsHeading);
        // create news description
        // let newsDescription = document.createElement("p");
        // newsDescription.className = "news-description"
        // newsDescription.innerText = `${news.description}`;
        // newDiv.appendChild(newsDescription);
        // create read more button
        let readBtn = document.createElement("a");
        readBtn.className = "read-button"
        readBtn.href = `${news.url}`;
        readBtn.innerHTML = 'Learn more <i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
        newDiv.appendChild(readBtn);
    }
  }

  const TopHeadline = (data) =>{
    
    for(let news of data){
        // create <li></li>
        let newsList = document.createElement("li");
        newsList.classList.add("news-item");
        headlineList.appendChild(newsList);
        // create <div></div>
        let newDiv = document.createElement("div");
        newDiv.className = "news"
        newDiv.style.background = `url("${news.urlToImage}")rgba(0,0,0,0.7)`;
        newDiv.style.backgroundSize = "cover";
        newsList.appendChild(newDiv);
        let newsHeading = document.createElement("h4");
        newsHeading.className = "news-heading";
        newsHeading.innerText = `${news.title}`;
        newDiv.appendChild(newsHeading);
        // create news description
        // let newsDescription = document.createElement("p");
        // newsDescription.className = "news-description"
        // newsDescription.innerText = `${news.description}`;
        // newDiv.appendChild(newsDescription);
        // create read more button
        let readBtn = document.createElement("a");
        readBtn.className = "read-button"
        readBtn.href = `${news.url}`;
        readBtn.innerHTML = 'Learn more <i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
        newDiv.appendChild(readBtn);
    }

    
  }

  

  const getTopHeadline = () =>{
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=597932d351b44a3b95ee56a78489f7a6";
    fetchNews(url,TopHeadline);
  }

  searchButton.addEventListener ("click",e => {
    e.preventDefault();
    let search = inputSearch.value;
    let url = `https://newsapi.org/v2/top-headlines?q=${search}&apiKey=597932d351b44a3b95ee56a78489f7a6`
    fetchNews(url,searchNews);
  })