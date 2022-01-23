const books =[
    { ISBN: "12345book",
     title: "geeting started",
     pubdate: " 2021-11-26",
     language: "en",
     numpage:" 260",
     author:[1,2],
     publication: [1],
     category: ["tech","programming", "education"]
     }
];
const author =[
    {
        id:1,
        name:"ayush",
        books:["12345book" ,"mybook"]

    },
    {
        id:2,
        name:"divyam",
        books:["12345book"]

    }
];
const publication =[{
id:1,
name:"dev Publication",
books:["12345book"],
},
{ 
    id:2,
    name:"ayush publication",
    books:[]
}
];

module.exports ={ books,author,publication};