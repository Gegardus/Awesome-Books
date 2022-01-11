const shelf = document.getElementById('shelf');
const bookItem = document.getElementById('bookItem');

const item = document.createElement('div');
item.classList.add('book');

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');

const store = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : [];

function removeBook(book) {
  const bookItems = Array.from(document.getElementsByClassName('book'));
  Object.keys(bookItems).forEach((key) => {
    if (book === key) {
      bookItems[key].remove();
      store.splice(key, 1);
      localStorage.setItem('store', JSON.stringify(store));
    }
  });
}

function display() {
  bookItem.innerHTML = '';
  store.forEach((currentBook) => {
    item.innerHTML = `<p id="book-title">${currentBook.title}</p>
    <p id="book-aurthor">${currentBook.author}</p>
    <button type="button" class="remove-btn">Remove</button>
    <hr/>`;
    bookItem.appendChild(item.cloneNode(true));
    shelf.appendChild(bookItem);
  });

  const removeButton = Array.from(document.getElementsByClassName('remove-btn'));
  Object.keys(removeButton).forEach((removeKey) => {
    removeButton[removeKey].addEventListener('click', () => {
      removeBook(removeKey);
    });
  }, false);
}

display();

function addBook(e) {
  e.preventDefault();
  store.push({
    title: inputTitle.value,
    author: inputAuthor.value,
  });

  localStorage.setItem('store', JSON.stringify(store));
  display();

  inputTitle.value = '';
  inputAuthor.value = '';
}

form.addEventListener('submit', addBook);
