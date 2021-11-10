/* Global Variables */

let libraryDisplay = document.getElementById('app');

let formSubmit = document.querySelector('input[type=submit]');

let myLibrary = [
    {
        name: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling",
        readStatus: "y",
        publishedDate: "1997"
    },
    {
        name: "Steve Jobs",
        author: "Walter Isaacson",
        readStatus: "y",
        publishedDate: "2011"
    },
    {
        name: "Masters of Doom",
        author: "David Kushner",
        readStatus: "y",
        publishedDate: "2003"
    },
    {
        name: "The Upstarts",
        author: "Brad Stone",
        readStatus: "y",
        publishedDate: "2017"
    }
];

/* Event Listeners */

formSubmit.addEventListener('click',addBookToLibrary);

/* Functions */

function getUserInput(e){
    e.preventDefault();
    let bookName = document.getElementById('bname').value;
    console.log(bookName);
    let authorName = document.getElementById('bauthor').value;
    let readStatus = document.querySelector('input[name="book_read"]:checked').value;
    console.log(readStatus);
    let publishedDate = document.getElementById('ypub').value;
    resetForm();
    return [bookName,authorName,readStatus,publishedDate];
}

function resetForm(){
    document.getElementById('bname').value = '';
    document.getElementById('bauthor').value = '';
    document.querySelector('input[name="book_read"]:checked').value = '';
    document.getElementById('ypub').value = '';
}

function Book(name,author,readStatus,publishedDate){
    this.name = name;
    this.author = author;
    this.readStatus = readStatus;
    this.publishedDate = publishedDate;
}

function addBookToLibrary(e){
    let userInput = getUserInput(e);
    let newBook = new Book(userInput[0],userInput[1],userInput[2],userInput[3]);
    myLibrary.push(newBook);
    displayLibrary();
    closeModal();
}

function drawCard(bookName,authorName,readStatus,publishedDate){
    let card = document.createElement('div');
    let cardTitle = document.createElement('div');
    let cardAuthor = document.createElement('div');
    let cardRead = document.createElement('div');
    let cardDate = document.createElement('div');
    cardTitle.textContent = bookName;
    cardAuthor.textContent = authorName;
    cardRead.textContent = readStatus;
    cardDate.textContent = publishedDate;
    card.classList.toggle('card');
    cardTitle.classList.toggle('title');
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardRead);
    card.appendChild(cardDate);
    libraryDisplay.appendChild(card);
}

function displayLibrary(){
    libraryDisplay.innerHTML="";
    myLibrary.forEach((book)=>drawCard(book.name,book.author,book.readStatus,book.publishedDate));
}

displayLibrary();

/* Modal Operation */

var addBookButton = document.getElementById('add-btn');

var modal = document.getElementById('modal');

var closeModalButton = document.getElementsByClassName('close')[0];

addBookButton.addEventListener('click',openModal);

function openModal(){
    modal.style.display = "block";
}

closeModalButton.addEventListener('click',closeModal);

function closeModal(){
    modal.style.display = "none";
}