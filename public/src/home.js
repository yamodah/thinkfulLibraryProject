function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksborrowed = 0;
  books.forEach((book) => {
    const borrowEntries = book.borrows;
    const firstEntry = borrowEntries[0];
    if (firstEntry.returned === false) {
      booksborrowed++;
    }
  });
  return booksborrowed;
}

function getMostCommonGenres(books) {
  const allGenres = books.map((book) => book.genre);

  //simplifying the allGenres to only have unique values by using Set
  //and spread operator get an array 


  const uniqueGenres = [...new Set(allGenres)];

  const mostCommonGenres = [];

  /*for each genre we are going to check the books array for
    num of books with that genre adding to the counter and 
    storing that varible and then constructing the object that
    needs to be pushed into mostCommonGenres all this has to be 
    done within this loop to maintain the speciic count value */

  uniqueGenres.forEach((genre) => {
    let counter = 0;
    allGenres.forEach((element) => {
      if (element === genre) {
        counter++;
      }
    });
    mostCommonGenres.push({ name: genre, count: counter });
  });

  mostCommonGenres.sort((a, b) => b.count - a.count);
  const sortedCommonGenres = mostCommonGenres.slice(0, 5);
  return sortedCommonGenres;
}

function getMostPopularBooks(books) {
  const newBooksWithCounts = books.map((book) => {
    const borrowLogCount = book.borrows.length;
    return { name: book.title, count: borrowLogCount };
  });
  const mostPopulatBooks = newBooksWithCounts.sort((a, b) => b.count - a.count);
  return mostPopulatBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const newAuthorsList = [];
  authors.forEach((author) => {
    const id = author.id;
    let counter = 0;
    books.forEach((book) => {
      const borrowLogCount = book.borrows.length;
      if (book.authorId === id) {
        counter += borrowLogCount;
      }
    });
    newAuthorsList.push({
      name: `${author.name.first} ${author.name.last}`,
      count: counter,
    });
  });

  return newAuthorsList.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
