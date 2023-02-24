// API key : 5d0ec0a57c5b64f209d5df23097e67c9

const headlinecontainer = document.getElementById("headline-container");
const headlineList = document.getElementById("headline-list");

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
        // console.log(data);
        showNews(data.articles)
    })
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
        newDiv.style.background = `url("${news.image}")rgba(0,0,0,0.7)`;
        newDiv.style.backgroundSize = "cover";
        newsList.appendChild(newDiv);
        let newsHeading = document.createElement("h4");
        newsHeading.className = "news-heading";
        newsHeading.innerText = `${news.title}`;
        newDiv.appendChild(newsHeading);
        
        // create read more button
        let readBtn = document.createElement("a");
        readBtn.className = "read-button"
        readBtn.href = `${news.url}`;
        readBtn.innerHTML = 'Learn more <i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
        newDiv.appendChild(readBtn);
    }
  }

  

  const getTopHeadline = () =>{
    let url = `https://gnews.io/api/v4/top-headlines?category=general&apikey=5d0ec0a57c5b64f209d5df23097e67c9&lang=en`;
    fetchNews(url,TopHeadline);
  }

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
    // const slider = handle.closest(".container").querySelector("#headline-container").querySelector("headline-list");
    const slider = document.querySelector("#headline-list");
    // console.log(document.querySelector("#headline-list"));
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
    if(handle.classList.contains("left-handle")){
      slider.style.setProperty("--slider-index", sliderIndex - 1);
      console.log(getComputedStyle(slider).getPropertyValue("--slider-index"));
      // slider.style.transform = `translateX(cal(var(${sliderIndex - 1}) * -100%))`;
      // console.log(slider.style.transform = `translateX(cal(var(${sliderIndex - 1}) * -100%))`);
    }
    if(handle.classList.contains("right-handle")){
      // slider.style.transform = `translateX(cal(var(${sliderIndex + 1}) * -100%))`;
      slider.style.setProperty("--slider-index", sliderIndex + 1);
    }
  }
