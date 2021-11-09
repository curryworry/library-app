let myLibrary = [];
function getUserInput(){
    let bookName = prompt("Enter Book Name");
    let authorName = prompt("Enter Author Name");
    let readStatus = prompt("Have you read this book? (y/n)");
    return [bookName,authorName,readStatus];
}

function Book(name,author,readStatus){
    this.name = name;
    this.author = author;
    this.readStatus = readStatus;
}

function addBookToLibrary(){
    let userInput = getUserInput();
    let newBook = new Book(userInput[0],userInput[1],userInput[2]);
    myLibrary.push(newBook);
    console.log(myLibrary);
}

addBook();