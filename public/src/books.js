function findByID (array,matchingID){
  const foundId = array.find((element) => element['id']=== matchingID)
  return foundId
}

function findAuthorById(authors, id) {
 return findByID(authors,id)
}

function findBookById(books, id) {
  return findByID(books, id)
}

function partitionBooksByBorrowedStatus(books) {
  const partitionedBooks = [];
  const checkedOut = [];
  const available = [];
  books.map((book) => {
    const checkLog = book.borrows;
    checkLog[0].returned === true
      ? available.push(book)
      : checkedOut.push(book);
  });
  partitionedBooks.push(checkedOut, available);
  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
  const borrowIds = book.borrows.map((entry) => entry.id);
  const users = [];
  accounts.forEach((account) => {
    if (borrowIds.includes(account.id)) {
      const userId = account.id;
      const borrowList = book.borrows;
      const truthValue = borrowList.find((entry) => {
        let returnedOrNot = "";
        if ((entry.id = userId)) {
          returnedOrNot = entry.returned;
        }
        return returnedOrNot;
      });
      console.log(truthValue.returned);
      account["returned"] = truthValue.returned;
      users.push(account);
    }
  });

  return users.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
