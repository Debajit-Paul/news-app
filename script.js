// API key : 597932d351b44a3b95ee56a78489f7a6

// let countryName = document.getElementById("country-name"); 
// console.log(countryName.options[countryName.selectedIndex].text);
let headlineList = document.getElementById("headline-list");

window.onload = () => {
    getTopHeadline();
  }

  const fetchNews = (url) => {
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


  const showNews = (data) =>{

    for(let news of data){
        // create <li></li>
        let newsList = document.createElement("li");
        newsList.classList.add("news-item");
        headlineList.appendChild(newsList);
        // create <div></div>
        let newDiv = document.createElement("div");
        newDiv.className = "news"
        newDiv.style.background = `rgba(0,0,0,0.5)url(${news.urlToImage})`;
        newDiv.style.backgroundSize = "cover";
        newDiv.style.backgroundRepeat = "no-repeat";
        newsList.appendChild(newDiv);
        //create <img>
        // let newsBanner = document.createElement("img");
        // newsBanner.className = "news-banner";
        // newsBanner.src = `${news.urlToImage}`;
        // newDiv.appendChild(newsBanner);
        // create news heading
        let newsHeading = document.createElement("h3");
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
        readBtn.innerHTML = "Learn more";
        newDiv.appendChild(readBtn);
    }
  }

  const getTopHeadline = () =>{
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=597932d351b44a3b95ee56a78489f7a6";
    fetchNews(url);
  }
