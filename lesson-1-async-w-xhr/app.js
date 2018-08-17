(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const list = document.querySelector("ul");
    function addImage(){
        let htmlContent = '';
        let imagData = JSON.parse(this.response);
       if(imagData && imagData.results && imagData.results[0]){
           const firstImg = imagData.results[0];
        //    console.log(firstImg);
        htmlContent = `<figure>
        <img src="${firstImg.urls.regular}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImg.user.username}</figcaption>
    </figure>`
       } else{
           htmlContent = `<div class="error-no-image">No images available
           </div>`
       }
       responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    const createArticle = (articles)=>{
        return articles.map((article)=>{
        `<li class="article">
        <h2><a href="${article.web_url}">${article.headline.main}
        </a></h2>
        <li>
        <p>${article.snippet}</p>`
    })
    }

    function addArticles(response) {
        console.log(JSON.parse(response));
        console.log("in artcl");
        const articles = JSON.parse(response).response.docs;
        let htmlContent2 = '';
        // if (articles && articles.response.docs && articles.response.docs.length > 1) {
        if (articles && articles.length > 1) {
            htmlContent2 = `<ul>${articles.map((article)=>{
              return `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}
                </a></h2>
                <li>
                <p>${article.snippet}</p>`
            })}</ul>`
        } else {
            htmlContent2 = `<div class="error-no-articles">No images available
           </div>`
        }
        console.log(htmlContent2);
        responseContainer.insertAdjacentHTML('beforeend', htmlContent2);
        // list.innerHTML = htmlContent2;
    }
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        imagesRequest();
        articlesRequest();
    });

    const imagesRequest = ()=>{
        const request = new XMLHttpRequest();
request.open('GET', 
'https://api.unsplash.com/search/photos?page=1&query=android');
request.onload = addImage;
request.setRequestHeader('Authorization', 
'Client-ID c419aa7cdad5900c7b57cca93cff5c91f6b6c4ddcbd8d46ea3a18f0b32e7ef39')
request.onerror = ()=>{
    console.log("error");
}
request.send();
    }
    
function articlesRequest(){
const articleRequest = new XMLHttpRequest();
articleRequest.onload = function(){
    // console.log(`in onload art ${articleRequest.response}`)
    addArticles(articleRequest.response);
}
articleRequest.open('GET',
 `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=
 ${searchedForText}&api-key=211e366789284dd6968c4a85368cc920`);
articleRequest.send();
}

})();

