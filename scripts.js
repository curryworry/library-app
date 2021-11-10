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

formSubmit.addEventListener('click',getUserInput);

/* Functions */

function getUserInput(e){
    e.preventDefault();
    let bookName = document.getElementById('bname').value;
    console.log(bookName);
    let authorName = document.getElementById('bauthor').value;
    let readStatus = document.querySelector('input[name="book_read"]').value;
    let publishedDate = document.getElementById('ypub').value;
    return [bookName,authorName,readStatus,publishedDate];
}

function Book(name,author,readStatus,publishedDate){
    this.name = name;
    this.author = author;
    this.readStatus = readStatus;
    this.publishedDate = publishedDate;
}

function addBookToLibrary(){
    let userInput = getUserInput();
    let newBook = new Book(userInput[0],userInput[1],userInput[2],userInput[3]);
    myLibrary.push(newBook);
    console.log(myLibrary);
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
    myLibrary.forEach((book)=>drawCard(book.name,book.author,book.readStatus,book.publishedDate));
}

displayLibrary();