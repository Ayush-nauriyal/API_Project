require("dotenv").config();

const express = require("express");

//database import
const database = require("./database");
const BookModel = require("./DATA_BASE/books");
const AuthorModel= require("./DATA_BASE/author");
const PublicationModel= require("./DATA_BASE/publication");
const mongoose = require("mongoose");
//Body-parser
const bodyParser =require("body-parser");
const Authormodel = require("./DATA_BASE/author");
const { findByIdAndUpdate } = require("./DATA_BASE/books");


//initializing express
const booky = express();


booky.use(bodyParser.urlencoded({extended : true}));
booky.use(bodyParser.json());

mongoose.connect(
    process.env.mongo_url 
).then(() => console.log("connection established"));


//Get all books
/*
    route                /
    description            get all books
    access                 public
    parameters              NONE
    methods                  get
*/
booky.get("/", async(req, res) => {
    const getallboooks =await BookModel.find();
    return res.json(getallboooks);
});
/*
booky.get("/", async(req, res) => {
    return res.json({books: database.books});
});

*/


//Get a specific book
/*
 route                    /is
    description            get specific book
    access                 public
    parameters              isbn(params)
    methods                  get
*/

booky.get("/is/:isbn", async(req, res) => {
    const getspecificbook = await BookModel.findOne({ISBN:req.params.isbn});
    

    if (!getspecificbook) {
        return res.json(
            {
                error: `No book found with the ISBN of ${req.params.isbn}`
            }
        );
    }
    return res.json(getspecificbook );

}
);
/*
booky.get("/is/:isbn", (req, res) => {
    const getspecificbook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getspecificbook.length === 0) {
        return res.json(
            {
                error: `No book found with the ISBN of ${req.params.isbn}`
            }
        );
    }
    return res.json({ book: getspecificbook });

}
);
/*



//Get  books on specific category
/*
 route                /
    description            get book based on specific category
    access                 public
    parameters              category
    methods                  get
*/
booky.get("/c/:category", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});
   

    if (!getSpecificBook) {
        return res.json(
            {
                error: `No book found with the category of ${req.params.category}`
            }
        );
    }
    return res.json(getSpecificBook);
});
/*
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) =>
        book.category.includes(req.params.category)
    );

    if (getSpecificBook.length === 0) {
        return res.json(
            {
                error: `No book found with the category of ${req.params.category}`
            }
        );
    }
    return res.json({ book: getSpecificBook });
});
*/


//Get  books on language
/*
 route                /
    description            get book based on specific LANGAUAGE
    access                 public
    parameters              lang
    methods                 get
*/
booky.get("/l/:lang", async (req, res) => {
    const getspeclang = await BookModel.findOne({language:req.params.lang});
    if (!getspeclang) {
        return res.json(
            {
                error: `No book found in language of ${req.params.lang}`
            }
        );
    }
    return res.json(getspeclang );
});

//AUTHOR
//Get all authors
/*
    route                /author
    description            get all author
    access                 public
    parameters              NONE 
    methods                  get
*/
booky.get("/author", async(req,res) =>
{ const getallauthors = await AuthorModel.find();
    return res.json(getallauthors);
});

/*booky.get("/author", (req,res) =>
{ 
    return res.json({authors :database.author});
});

*/
//Get specific author
/*
    route                /author
    description            get specific author 
    access                 public
    parameters             isbn
    methods                  get
*/

booky.get("/author/book/:isbn", async(req,res) =>
{
    const getspecificauthor = await AuthorModel.findOne({book: req.params.isbn});
 

    if (!getspecificauthor) {
        return res.json(
            {
                error: `No author found with the ISBN of ${req.params.isbn}`
            }
        );
    }
    return res.json(getspecificauthor);

});

/*
booky.get("/author/book/:isbn", (req,res) =>
{
    const getspecificauthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getspecificauthor.length === 0) {
        return res.json(
            {
                error: `No author found with the ISBN of ${req.params.isbn}`
            }
        );
    }
    return res.json({authors :getspecificauthor});

});
*/


//get list of authors based on book
/*
    route                /author
    description            get specific author 
    access                 public
    parameters             isbn
    methods                  get
*/














//PUBLICATIONS
//Get all publictions
/*
    route                /publications
    description            get all publications
    access                 public
    parameters              NONE
    methods                  get
*/

booky.get("/publications" , async (req,res) =>
{  const getallpublication =await PublicationModel.find();
    return res.json(getallpublication);
});


//Get specific publictions
/*
    route                /publications
    description            get specific publications
    access                 public
    parameters              isbn
    methods                  get
*/
booky.get("/publications/:isbn", async(req,res) =>{
    const getspecificpub = await PublicationModel.findOne({books:req.params.isbn});

    if (!getspecificpub) {
        return res.json(
            {
                error: `No publication found for book of the ISBN  ${req.params.isbn}`
            }
        );
    }
    return res.json(getspecificpub);
}
);

/*
booky.get("/publications/:isbn", (req,res) =>{
    const getspecificpub = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getspecificpub.length === 0) {
        return res.json(
            {
                error: `No publication found for book of the ISBN  ${req.params.isbn}`
            }
        );
    }
    return res.json({publications :getspecificpub});
}
);
*/

//ADD NEW AUTHORS

/*
Route           /author/new
Description     add new authors
Access          Public
Parameter       NONE
Methods         POST
*/
booky.post("/book/new",async(req,res)=> {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook)
    return res.json({books: addNewBook, message: "Book was added"});
  });

  /*
booky.post("/book/new", (req,res)=> {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
  });
  */

  //ADD NEW AUTHORS

/*
Route           /author/new
Description     add new authors
Access          Public
Parameter       NONE
Methods         POST
*/
/*
booky.post("/author/new", (req,res)=> {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({updatedAuthors: database.author});
  });
  */
  /*
  booky.post("/author/new", async(req,res) =>
  {  const {newAuthor} =req.body;
    const addnewAuthor =BookModel.create(newAuthor);
    return res.json({books:addnewAuthor , message: "book was added!"});
   
} );*/

booky.post("/author/new", async (req,res)=> {
    const {newAuthor} = req.body;
    Authormodel.create(newAuthor);
    return res.json({updatedAuthors: database.author});
  });

  //ADD NEW PUBLICATIONS

  /*
  Route           /publication/new
  Description     add new publications
  Access          Public
  Parameter       NONE
  Methods         POST
  */
  
  booky.post("/publication/new", async (req,res)=> {
    const {newPublication} = req.body;
    PublicationModel.create(newPublication);
    return res.json({updatedPublications: database.publication});
  });

//Update a book title
/*
Route           /book/update/:isbn
Description     update title of the book
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/:isbn", async (req,res)=> {
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn
      },
      {
        title: req.body.bookTitle
      },
      {
        new: true
      }
    );
  
    return res.json({books: database.books});
  });




//UPADTE PUB AND BOOK
/*
Route           /publication/update/book
Description     update the pub and the book
Access          Public
Parameter       isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn",async (req,res)=> {
 /*
    //UPDATE THE PUB DB
    database.publication.forEach((pub) => {
      if(pub.id === req.body.pubId) {
        return pub.books.push(req.params.isbn);
      }
    });
    */
   const updatepublication=await PublicationModel.findOneAndUpdate(
        {
          id: req.body.pubId
        },
        {
            books:req.params.isbn
        },
        {
            new :true
        }
    );
    
  /*
    //UPDATE THE BOOK DB
    database.books.forEach((book) => {
      if(book.ISBN == req.params.isbn) {
        book.publication = req.body.pubId;
        return;
      }
    });
    */
 const updatebook=await BookModel.findOneAndUpdate(
  {
    ISBN:req.params.isbn                
  },
  {  
      publication: req.body.pubId
  },
  { 
      new: true
  }
  );
    return res.json(
      {
        books: database.books,
        publication: database.publication,
        message: "Successfully updated"
      }
    )
  
  });




  //DELETE A BOOK
/*
Route           /book/delete
Description     delete a book
Access          Public
Parameter       isbn
Methods         DELETE
*/

booky.delete("/book/delete/:isbn" , async (req,res) => {
    const updatebookdata=await BookModel.findOneAndDelete( {
        ISBN:req.params.isbn 
    });
    return res.json({books:updatebookdata});
});
/*
booky.delete("/book/delete/:isbn" , (req,res) => {
    const updatebook=database.books.filter((book) => 
    book.ISBN!==req.params.isbn
    );
    database.books=updatebook;
    return res.json({books:database.books});
});
*/



//Delete an author from a book and vice versa

/*
Route           /book/delete/author
Description     delete an author from a book and vice versa
Access          Public
Parameter       isbn, authorId
Methods         DELETE
*/
booky.delete("/book/delete/:isbn/:authorID" , async (req,res) => {
   //update
  /* database.books.forEach((book) => {
       if(book.ISBN===req.params.isbn)
       {  
           const newauthor = book.author.filter((eauthor) =>
            eauthor!== parseInt(req.params.authorID));
            book.author=newauthor;
            return;

       }
   });*/
  const updatedBook = await BookModel.findOneAndDelete(
      {
          ISBN: req.params.isbn
      },
      {
          $pull:{
              authors: parseInt(req.params.authorID)
          }
      },
      {
          new: true
      }
  );
  /*
   database.author.forEach((eaauthor) => {
       if(eaauthor.id===parseInt(req.params.authorID))
       {
           const newbook=eaauthor.books.filter((book) => 
           book!==req.params.isbn);
           eaauthor.books=newbook;
           return;
       }
   });
   */
   const updateauthor= await AuthorModel.findOneAndDelete(
      {
          id:parseInt(req.params.authorID)
      },
      { $pull:{
          books: req.params.isbn
      }
      },
      { 
          new: true
      }
   );

    return res.json({
        book:database.books,
        author:database.author,
        message:"author and book are deleted!!"

    });


});


booky.listen(3000, () => console.log("server is up and running"));