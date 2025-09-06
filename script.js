

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
    }
  })
}

renderCategory();