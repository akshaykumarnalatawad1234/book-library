let myLibrary = [];

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = "not read";
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const status = document.querySelector("#status");
const tableBody = document.querySelector("#book-table-body");
const form = document.querySelector("form");
const submitBtn = document.querySelector('#submit');

window.addEventListener('DOMContentLoaded', () => {
    const libraryData = localStorage.getItem('library');
    if (libraryData) {
      myLibrary = JSON.parse(libraryData);
      render();
    }
  });
  

function addBooktoLibrary(){
    if(title.length === 0 || author.length === 0){
        alert('Please fill in all fileds');
        return ;
    }

    const book = new Book(title.value, author.value, pages.value);
    book.status = status.value;
    myLibrary.push(book);
    setLocalStorage();
    
}

function setLocalStorage(){
    localStorage.setItem('library', JSON.stringify(myLibrary));
}
function deleteBook(currentBook){
    myLibrary.splice(currentBook, currentBook+1);
    setLocalStorage();
}


function findBook(title){
    for(let book of myLibrary){
        if(book.title  == title){
            return myLibrary.indexOf(book);
        }
    }
    return ;
}

function changeStatus(book) {
    if (myLibrary[book].status === "read") {
      myLibrary[book].status = "not read";
    } 
    else myLibrary[book].status = "read";
    setLocalStorage();
}

function render() {
tableBody.innerHTML = "";
myLibrary.forEach((book) => {
    const htmlBook = `
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><input type="number" value="${book.pages}" onchange="handleChange('${book.title}', this.value)"/></td>
        <td><button class="status-button">${book.status}</button></td>
        <td><button class="delete">delete</button></td>
    </tr>
    `;
    tableBody.innerHTML += htmlBook;
});
}


submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    addBooktoLibrary();
    clearForm();
    render();
})


tableBody.addEventListener('click', (e) =>{

    const currentBook = e.target.parentElement.parentElement.firstElementChild;
    if(e.target.classList.contains('delete')){
        deleteBook(findBook(currentBook.innerText));
    }
    if(e.target.classList.contains('status-button')){
        changeStatus(findBook(currentBook.innerText));
    }
    
    render();
})

function handleChange(title, pages) {
    const currentBook = myLibrary.find((book) => book.title === title);
    if (currentBook) {
      currentBook.pages = pages;
    }
    render();
    setLocalStorage();
  }

function clearForm(){
    title.value = "";
    author.value = "";
    pages.value = 0;
}

render();