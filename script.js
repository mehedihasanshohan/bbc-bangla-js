

function renderCategory() {
  const url = 'https://news-api-fs.vercel.app/api/categories';
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategory(data.categories))
  .catch(err => console.error("Error fetching data:", err));
}

function displayCategory(categories) {
  const categoryContainer = document.getElementById('category-container');
  categoryContainer.innerHTML = "";

  categories.forEach(category => {
    categoryContainer.innerHTML += `
    <li id="${category.id}" class="p-1 m-4 cursor-pointer text-xl font-bold text-white hover:border-b-4">${category.title}
    </li>
    `
  });

  // acitve category
  categoryContainer.addEventListener('click', (e) => {
    //removed indicator from all item
    const allLi = document.querySelectorAll('li');
    allLi.forEach(li => {
      li.classList.remove('border-b-4');
    })
    // set indicator on clicked item
    if(e.target.localName === 'li'){
      e.target.classList.add('border-b-4');
      loadNewsByCategory(e.target.id);
      // console.log(e.target.id);
    }
  })
}

const loadNewsByCategory = (category_id) => {
  const url = `https://news-api-fs.vercel.app/api/categories/${category_id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showNewsByCategory(data))
  .catch(err => console.error("Error fetching data:", err));
}

const showNewsByCategory = (news) => {
  console.log(news.articles);
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = "";

  news.articles.forEach(article => {
    newsContainer.innerHTML += `
      <div class="border p-4 rounded-lg shadow-lg">
        <img src="${article.image.srcset[5].url}" alt="${article.title}" class="w-full h-48 object-cover rounded-md mb-4">
        <h2 class="text-xl font-bold mb-2">${article.title}</h2>
      </div>

`})

}


renderCategory();