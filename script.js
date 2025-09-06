

function renderCategory() {
  const url = 'https://news-api-fs.vercel.app/api/categories';
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategory(data.categories))
  .catch(err => console.error("Error fetching data:", err));
}

function displayCategory(articles) {
  // console.log(articles);
  const newsContainer = document.getElementById('category-container');
  newsContainer.innerHTML = "";

  articles.forEach(article => {
    // console.log(article);
    const newsItem = document.createElement('li');
    newsItem.classList.add(
      'p-1',
      'm-4',
      'cursor-pointer',
      'text-xl',
      'font-bold',
      'text-white'
    );
    newsItem.textContent = article.title;
    newsContainer.appendChild(newsItem);
  });

  // acitve category
  newsContainer.addEventListener('click', (e) => {
    //removed indicator from all item
    const allLi = document.querySelectorAll('li');
    allLi.forEach(li => {
      li.classList.remove('border-b-4');
    })
    // set indicator on clicked item
    if(e.target.localName === 'li'){
      e.target.classList.add('border-b-4');
    }
  })
}

renderCategory();