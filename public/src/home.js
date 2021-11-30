function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = books.reduce((acc, book) => {
    for(let i = 0; i < book.borrows.length; i++) 
    {
      if(book.borrows[i].returned === false) 
      {
      acc++
    }}
    return acc
  },0)
  return result
}


function getMostCommonGenres(books) {
   const genre = books.map((book) => book.genre);
   let array = [];
   let count = {};
   genre.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
   });
   for (let key in count) {
     array.push({
       name: key,
       count: count[key],
     });
   }
   array.sort((a, b) => (a.count < b.count ? 1 : -1));
   return array.slice(0, 5);
  }

  /*const bookGenres = books.map((book) => book.genre);
  const temp = [];
  //map over book genres
  bookGenres.map((genre) => {
    //for each genre, first check to see if genre already exists in array
    const genreLocation = temp.findIndex((element) => element.name === genre);
    //second, if it exists, increase count by 1
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
      //else, if it don't exist, push a new genre object onto array with count of 1
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}
*/

function getMostPopularBooks(books) {
   // organise book data
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
    // sort by borrow count, descending
    borrows.sort((a,b) => b.count - a.count);
    // return top 5
    return borrows.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
 authors.forEach((author) => {
  let theAuthor = {
   name: `${author.name.first} ${author.name.last}`,
   count: 0
  };
  books.forEach((book) => {
   if (book.authorId === author.id) {
    theAuthor.count += book.borrows.length;
   }
  });
  result.push(theAuthor);
 });
 return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
