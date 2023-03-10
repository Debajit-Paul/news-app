// API key : 5d0ec0a57c5b64f209d5df23097e67c9

const headlineSlider = document.getElementById("headline-slider");
const activeNews = document.querySelector(".active").innerText;
const newsContainer = document.getElementById("news-container");
const tabs = document.querySelectorAll(".tab-header > div");
const tabBody = document.querySelectorAll(".news-container");
const tabIndicator = document.querySelector(".tab-indicator");

window.onload = () => {
    getTopHeadline();
    // console.log(activeNews);
    getNews(activeNews);
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

//  Data Display 

  const TopHeadline = (data) => {

    for(let news of data){
        // create <li></li>
        let newsList = document.createElement("li");
        newsList.classList.add("slider-List");
        headlineSlider.appendChild(newsList);

        // create <div></div>
        let newsDiv = document.createElement("div");
        newsDiv.className = "slider-News"
        newsDiv.style.background = `url("${news.image}")rgba(0,0,0,0.6)`;
        newsDiv.style.backgroundSize = "cover";
        newsList.appendChild(newsDiv);
        let newsHeading = document.createElement("h4");
        newsHeading.className = "slider-News-heading";
        newsHeading.innerText = `${news.title}`;
        newsDiv.appendChild(newsHeading);
        
        // create read more button
        let readBtn = document.createElement("a");
        readBtn.className = "slider-Read-button"
        readBtn.href = `${news.url}`;
        readBtn.innerHTML = 'Learn more <i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
        newsDiv.appendChild(readBtn);
    }
  }

  const News =(data) => {
    while(newsContainer.hasChildNodes()){
      newsContainer.removeChild(newsContainer.firstChild);
    }

    for(let news of data){
      // create <li></li>
      let newsList = document.createElement("li");
      newsList.classList.add("news");
      
      // create <div></div>
      let newsDiv = document.createElement("div");
      newsDiv.classList.add("news-Div");
      
      
      // create <img>
      let newsImg = document.createElement("img");
      newsImg.classList.add("news-Image");
      newsImg.src = `${news.image}`;
      
      
      // create <h4></h4>
      let newsHeading = document.createElement("h4");
      newsHeading.classList.add("news-Heading");
      newsHeading.innerText = `${news.title}`;
      
      
      // create read more button
      let readBtn = document.createElement("a");
      readBtn.className = "news-Read-button"
      readBtn.href = `${news.url}`;
      readBtn.innerHTML = 'Learn more <i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
      

      newsContainer.appendChild(newsList);
      newsList.appendChild(newsImg);
      newsList.appendChild(newsDiv);
      newsDiv.appendChild(newsHeading);
      newsDiv.appendChild(readBtn);
    }
  }

// Tab functionality

  tabs.forEach((tab) =>{
    tab.addEventListener("click", e =>{
      tabs.forEach((tab) =>{
        tab.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      const activeNews = document.querySelector(".active").innerText;
      getNews(activeNews);
      tabIndicator.style.marginLeft = `calc(calc(100% / 4) * calc(${e.currentTarget.id}))`;
    })
  })

  
// Fetch request

  const getTopHeadline = () =>{
    let url = `https://gnews.io/api/v4/top-headlines?category=general&apikey=5d0ec0a57c5b64f209d5df23097e67c9&lang=en`;  // Real API
    // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=597932d351b44a3b95ee56a78489f7a6`;  // Test API
    fetchNews(url,TopHeadline);
  }

  const getNews = (activeNews) => {
    let url = `https://gnews.io/api/v4/search?q=${activeNews}&apikey=5d0ec0a57c5b64f209d5df23097e67c9&lang=en`; // Real API
    // let url = `https://newsapi.org/v2/top-headlines?q=${activeNews}&apiKey=597932d351b44a3b95ee56a78489f7a6`;  // Test API
    fetchNews(url,News);
  }


// Sliding Button

  document.addEventListener("click", e =>{
    let handle;
    if(e.target.matches(".handle")){
      handle = e.target;
    }else{
      handle = e.target.closest(".handle")
    }
    if(handle != null){
      onHandleClick(handle);
    }
  })

  function onHandleClick(handle) {
    const slider = document.querySelector("#headline-slider");
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
    if(handle.classList.contains("left-handle")){
      slider.style.setProperty("--slider-index", sliderIndex - 1);
      console.log(getComputedStyle(slider).getPropertyValue("--slider-index"));
    }
    if(handle.classList.contains("right-handle")){
      slider.style.setProperty("--slider-index", sliderIndex + 1);
    }
  }