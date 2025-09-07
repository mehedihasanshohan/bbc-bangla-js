  const categoryContainer = document.getElementById('category-container');
  const newsContainer = document.getElementById('news-container');
  const bookmarkLength = document.getElementById('bookmark-length');
  // array to store bookmarks
  const bookmarkContainer = document.getElementById('bookmark-container');
  let bookmarks = [];

function renderCategory() {
  const url = 'https://news-api-fs.vercel.app/api/categories';
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategory(data.categories))
  .catch(err => console.error("Error fetching data:", err));
}

function displayCategory(categories) {
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
  // console.log(news.articles);
  newsContainer.innerHTML = "";

  news.articles.forEach(article => {
    // console.log(article);
    if(article ){
      newsContainer.innerHTML += `
      <div class="border p-4 rounded-lg shadow-lg">
       <div>
        <img src="${article.image.srcset[5].url}" alt="${article.title}" class="w-full h-48 object-cover rounded-md mb-4">
       </div>
       <div id=${article.id}>
        <h2 class="text-xl font-bold mb-2">${article.title}</h2>
        <h2 class="text-md font-gray-300 font-bold mb-2">${article.time}</h2>
        <button class='btn bg-gray-400 rounded-lg py-2 px-4 cursor-pointer'>Bookmark</button>
       </div>
      </div>
      `
    } else {
      newsContainer.innerHTML  = `<h2 class="text-2xl font-bold">No news found in this category</h2>`;
    }}
)
}


newsContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('btn')){
    // console.log('bookmark btn clicked');
    renderBookmark(e);
}})

function renderBookmark(e){
  const title = e.target.parentNode.children[0].innerText;
    const id = e.target.parentNode.id;
    // console.log(title, id);

    // add to bookmark array
    bookmarks.push({
      id:id,
      title:title});
    console.log(bookmarks);
    showBookmark(bookmarks);
}

const showBookmark = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach(bookmark => {
    bookmarkContainer.innerHTML += `
    <div class="border rounded-lg p-2 mb-2 shadow-xl">
      <h1>${bookmark.title}</h1>
      <button class="bg-red-500 text-white rounded-lg py-1 px-2 mt-2 cursor-pointer" onclick="removeBookmark('${bookmark.id}')">Remove</button>
    </div>
    `
      bookmarkLength.innerText =bookmarks.length;

  })
}

const removeBookmark = (id) => {
  // console.log('remove bookmark', id);
  bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
  showBookmark(bookmarks);
}


renderCategory();
loadNewsByCategory('main'); //default category