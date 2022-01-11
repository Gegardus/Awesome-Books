const shelf = document.getElementById('shelf');
const bookItem = document.getElementById('bookItem');

const item = document.createElement('div');
item.classList.add('book');

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');

class Book {
constructor() {
  this.store = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : [];
}
 
addBook() {
  this.store.push({
    title: inputTitle.value,
    author: inputAuthor.value,
  });
  localStorage.setItem('store', JSON.stringify(this.store));
  inputTitle.value = '';
  inputAuthor.value = '';
}

removeBook(book) {
  const title = book.querySelector('#book-title').innerText;
  book.remove();
  this.store = this.store.filter((bookItem) => bookItem.title !== title);
      localStorage.setItem('store', JSON.stringify(this.store));
    }
  }

const library = new Book();

function display() {
  bookItem.innerHTML = '';
  library.store.forEach((currentBook) => {
    item.innerHTML = `<p id="book-aurthor">"<span id="book-title">${currentBook.title}</span>"<span id="by">by</span>${currentBook.author}</p>
    <button type="button" class="remove-btn">Remove</button>`;
    bookItem.appendChild(item.cloneNode(true));
    shelf.appendChild(bookItem);
  });

  const removeButton = Array.from(document.getElementsByClassName('remove-btn'));
  Object.keys(removeButton).forEach((removeKey) => {
    const btn = removeButton[removeKey];
    btn.addEventListener('click', () => {
    library.removeBook(btn.parentNode);
    });
  }, false);
}

display();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  library.addBook();
  display();
});
