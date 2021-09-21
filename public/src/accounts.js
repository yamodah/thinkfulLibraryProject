function findAccountById(accounts, id) {
  const matchingAccount = accounts.find((account) => account["id"] === id);
  return matchingAccount;
}

function sortAccountsByLastName(accounts) {
  const sortedByLast = accounts.sort((a, b) => {
    return a["name"].last > b["name"].last ? 1 : -1;
  });
  return sortedByLast;
}

function getTotalNumberOfBorrows(account, books) {
  const userId = account.id;
  let numOfBorrows = 0;
  books.reduce((acc, book) => {
    const lendIds = book["borrows"];
    lendIds.filter((idObj) => (idObj.id === userId ? acc++ : false));
    numOfBorrows = acc;
    return acc;
  }, numOfBorrows);
  return numOfBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const userId = account.id;
  const checkedOut = [];
  books.map((book) => {
    const lendIds = book["borrows"];
    lendIds.map((idObj) => {
      if (idObj.id === userId && idObj.returned === false) {
        const authorObj = authors.find(
          (author) => author.id === book["authorId"]
        );
        book["author"] = authorObj;
        checkedOut.push(book);
      } else {
        return false;
      }
    });
  });
  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
