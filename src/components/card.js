import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div> 
  // </div>
  //
  const cardNew = document.createElement('div');
  const headDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imageDiv = document.createElement('div');
  const image = document.createElement('img');
  const name = document.createElement('span');

  cardNew.classList.add('card');
  headDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imageDiv.classList.add('img-container');

  cardNew.appendChild(headDiv);
  cardNew.appendChild(authorDiv);
  authorDiv.appendChild(imageDiv);
  imageDiv.appendChild(image);
  authorDiv.appendChild(name);

  headDiv.textContent = `${article.headline}`
  image.src = `${article.authorPhoto}`
  name.textContent = `By ${article.authorName}`

  cardNew.addEventListener('click', ()=>{
    console.log(headDiv)
  })

  return cardNew
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`http://localhost:5000/api/articles`).then(data => {
    let articleData = data.data.articles;
    console.log(data);
    for (let topic in articleData) {
      console.log(topic);
      data.data.articles[topic].forEach(item => {
        let cardFill = Card(item);
        const classSelector = document.querySelector(selector);
        classSelector.appendChild(cardFill);
      })
    }

  })
}

export { Card, cardAppender }
