function findAccountById(accounts, id) {
  return accounts.find((account) => account["id"] === id);
}

function sortAccountsByLastName(accounts) {
const sorted = accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1             
   ); 
   return sorted;
}

function getTotalNumberOfBorrows(account, books) {
let result = books.reduce((acc, book) => {
     for(let i = 0; i < book.borrows.length; i++) 
     {
       if(book.borrows[i].id === account.id) 
       {
       acc++
     }}
     return acc
   },0)
   return result
}

function getBooksPossessedByAccount(account, books, authors) {
let result = [];
  let borrowMatch = [];
  books.forEach((item) => {
   const borrowed = item.borrows;
   const book = {
    id: item.id,
    title: item.title,
    genre: item.genre,
    authorId: item.authorId,
    author: {},
    borrows: {}
   };
   const { id, title, genre, authorId, author, borrows } = book;
 
   borrowed.forEach((borrow) => {
    if (borrow.id === account.id && borrow.returned === false) {
     result.push(book);
     borrowMatch.push(borrow);
     book.borrows = borrowMatch;
     book.author = authors.filter((auth) => auth.id === book.authorId)[0];
    }
   });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
