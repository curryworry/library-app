/* Global Variables */

let libraryDisplay = document.getElementById("app");

let formSubmit = document.querySelector("input[type=submit]");

let checkBoxes;

let initialValues = [
  {
    name: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    readStatus: "y",
    publishedDate: "1997",
    isbn: "9780747532743",
  },
  {
    name: "Steve Jobs",
    author: "Walter Isaacson",
    readStatus: "y",
    publishedDate: "2011",
    isbn: "9781451648546",
  },
  {
    name: "Masters of Doom",
    author: "David Kushner",
    readStatus: "y",
    publishedDate: "2003",
    isbn: "9780749924751",
  },
  {
    name: "The Upstarts",
    author: "Brad Stone",
    readStatus: "y",
    publishedDate: "2017",
    isbn: "9780316388412",
  },
];

let myLibrary = [];

/* Event Listeners */

formSubmit.addEventListener("click", addBookToLibrary);

/* Object Prototype */

function Book(name, author, readStatus, publishedDate, isbn) {
  this.name = name;
  this.author = author;
  this.readStatus = readStatus;
  this.publishedDate = publishedDate;
  this.isbn = isbn;
}

Book.prototype.toggleRead = function () {
  this.readStatus == "y" ? (this.readStatus = "n") : (this.readStatus = "y");
};

/* Functions */

function toggleReadStatus(e) {
  let boxIsbn = e.target.dataset.isbn;
  let targetBook = myLibrary.find((element) => element.isbn == boxIsbn);
  targetBook.toggleRead();
  updateLocalStorage();
}

function getUserInput(e) {
  e.preventDefault();
  let bookName = document.getElementById("bname").value;
  let authorName = document.getElementById("bauthor").value;
  let readStatus = document.querySelector(
    'input[name="book_read"]:checked'
  ).value;
  let publishedDate = document.getElementById("ypub").value;
  let isbn = document.getElementById("isbn").value;
  resetForm();
  return [bookName, authorName, readStatus, publishedDate, isbn];
}

function resetForm() {
  document.getElementById("bname").value = "";
  document.getElementById("bauthor").value = "";
  document.querySelector('input[name="book_read"]:checked').value = "";
  document.getElementById("ypub").value = "";
  document.getElementById("isbn").value = "";
}

function addBookToLibrary(e) {
  let userInput = getUserInput(e);
  let newBook = new Book(
    userInput[0],
    userInput[1],
    userInput[2],
    userInput[3],
    userInput[4]
  );
  myLibrary.push(newBook);
  displayLibrary();
  closeModal();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("userLibrary", JSON.stringify(myLibrary));
}

function drawCard(bookName, authorName, readStatus, publishedDate, isbn) {
  let card = document.createElement("div");
  let cardTop = document.createElement("div");
  let cardTitle = document.createElement("div");
  let cardClose = document.createElement("span");
  let cardAuthor = document.createElement("div");
  let cardRead = document.createElement("div");
  let cardReadCheckbox = document.createElement("input");
  let cardReadLabel = document.createElement("label");
  let cardDate = document.createElement("div");
  let cardIsbn = document.createElement("div");
  card.setAttribute("data-isbn", isbn);
  cardTop.classList.toggle("card-top");
  cardClose.classList.toggle("close-card");
  cardClose.innerHTML = "&times;";
  cardTitle.textContent = bookName;
  cardRead.classList.toggle("read-checkbox");
  cardAuthor.textContent = authorName;
  cardReadCheckbox.type = "checkbox";
  cardReadCheckbox.name = `cb-${isbn}`;
  cardReadCheckbox.setAttribute("data-isbn", isbn);
  cardReadCheckbox.value = "y";
  if (checkBookRead(isbn)) {
    cardReadCheckbox.checked = true;
  } else {
    cardReadCheckbox.checked = false;
  }
  cardReadLabel.for = `cb-${isbn}`;
  cardReadLabel.textContent = "Book read?";
  cardReadLabel.classList.toggle("read-label");
  cardDate.textContent = publishedDate;
  cardIsbn.textContent = isbn;
  card.classList.toggle("card");
  cardTitle.classList.toggle("title");
  cardRead.appendChild(cardReadCheckbox);
  cardRead.appendChild(cardReadLabel);
  cardTop.appendChild(cardTitle);
  cardTop.appendChild(cardClose);
  card.appendChild(cardTop);
  card.appendChild(cardAuthor);
  card.appendChild(cardDate);
  card.appendChild(cardIsbn);
  card.appendChild(cardRead);
  libraryDisplay.appendChild(card);
}

function checkBookRead(isbn) {
  let targetBook = myLibrary.find((book) => book.isbn == isbn);
  return targetBook.readStatus == "y" ? true : false;
}

function displayLibrary() {
  libraryDisplay.innerHTML = "";
  myLibrary.forEach((book) =>
    drawCard(
      book.name,
      book.author,
      book.readStatus,
      book.publishedDate,
      book.isbn
    )
  );
  checkBoxes = document.querySelectorAll("input[type='checkbox']");

  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("input", toggleReadStatus);
  });

  removeBookIcons = document.querySelectorAll("span[class='close-card']");

  removeBookIcons.forEach((icon) => {
    icon.addEventListener("click", removeBook);
  });
}

function removeBook(e) {
  let parentDiv = e.target.parentNode.parentNode;
  let isbn = parentDiv.dataset.isbn;
  let targetBook = myLibrary.find((book) => book.isbn == isbn);
  let bookIndex = myLibrary.indexOf(targetBook);
  myLibrary.splice(bookIndex, 1);
  displayLibrary();
  updateLocalStorage();
}

function initializeLibrary() {
  if (!localStorage.getItem("userLibrary")) {
    initialValues.forEach((value) => {
      let newBook = new Book(
        value.name,
        value.author,
        value.readStatus,
        value.publishedDate,
        value.isbn
      );
      myLibrary.push(newBook);
    });
  }
  else{
      let storedBooks = JSON.parse(localStorage.getItem('userLibrary'));
      storedBooks.forEach((book) => {
        let newBook = new Book(
            book.name,
            book.author,
            book.readStatus,
            book.publishedDate,
            book.isbn
          );
        myLibrary.push(newBook);
      });
  }
  displayLibrary();
}

initializeLibrary();

/* Modal Operation */

var addBookButton = document.getElementById("add-btn");

var modal = document.getElementById("modal");

var closeModalButton = document.getElementsByClassName("close")[0];

addBookButton.addEventListener("click", openModal);

function openModal() {
  modal.style.display = "block";
}

closeModalButton.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
}
