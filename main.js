// create arrays

let todoitems = [];
let completed = [];
// require all npm packages
const express = require('express');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const bodyParser = require('body-parser');
// const todoitems = require('./todoitems');
// const completed = require('./XtoDoItems')
const app = express();

// tell express to use mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');



// render the todoitems for the todo list
app.get('/', function(req, res) {
  res.render('index', {
    todoitems: todoitems,
    completed: completed
  })
});


// use the body parser to help format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// provide a method for adding todoitems via post method

app.post('/newToDo', function(req, res){
  let ntdi = req.body.todo;
  todoitems.push(ntdi)
res.redirect('/')
  console.log('new to do item')
})

app.post('/completed', function(req, res){
  for(let i = 0; i < todoitems.length; i++){
    if(req.body.complete === todoitems[i]){
      completed.push(todoitems[i]);
      todoitems.splice(i, 1);
    }
  }
  res.redirect('/')
})


app.listen(3000 , function(){
  console.log('App is running');
});
