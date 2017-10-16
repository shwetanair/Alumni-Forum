## Project Description

The project is a website for alumni
and students to discuss and share knowledge on relevant topics with the ability
to upvote, downvote and favorite any discussion thread of importance.

Purpose of the project is to
allow alumni to actively involved in discussion for the benefit of students and
network with other alumni. The platform allows the users to explore wide range
of threads and post reply to other threads so that all the users can benefit
from the Forum.

The web application contains the
following important features:

·       
User signup/registration

·       
User Login

·       
User profile: Upload profile photo

·       
User Roles: admin, user, guest

·       
Create a discussion thread

·       
View discussions/threads

·       
Add/remove a discussion/thread to/from favorites

·       
Upvote and downvote ability for any thread

·       
Edit/Delete threads

·       
Post reply on any thread (hierarchy of comments
will be maintained)

·       
Add Image to a thread

·       
Search for a thread using a keyword or tag

·       
Filter threads based on Company, University

·       
Soft delete has been implemented making all data
in the database to stay even if a thread is deleted

·       
Admin can view all threads and users

·       
Admin can delete any thread

·       
Admin can grant other users admin privileges and
revoke admin privileges

·       
Top topics suggestion for logged in user

## Database Design

MongoDB is a free and open-source
cross-platform document-oriented database program. Classified as a NoSQL
database program and stores data in flexible, JSON-like documents. Thus, the
data stricture of the database can be changed over time. 

All collections use soft delete.
Data is never deleted from the database.

The Data models of our website
database are as below:

```js
User:
UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    workStatus: String,
    password: String,
    company: String,
    university: String,
    filename: String,
    status: Boolean,
    isAdmin: Boolean,
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    comments: {type: [Schema.ObjectId], ref: 'Comment'},
    favs: [{type: Schema.ObjectId, ref: 'Post'}]
});
mongoose.model('User', UserSchema);

```
```js
Thread/Post:
PostSchema = mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    tags: [{type: Schema.ObjectId, ref: 'Tags'}],
    dateCreated: Date,
    lastModified: Date,
    versions: [String],
    upvotes: [{type: Schema.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.ObjectId, ref: 'User'}],
    comments: [{type: Schema.ObjectId, ref: 'Comment'}],
    user: {type: Schema.ObjectId, ref: 'User'},
    status: Boolean,
    preview: Number
});
mongoose.model('Post', PostSchema);

```
```js
Comment:
var CommentSchema = mongoose.Schema({
    text: String,
    dateCreated: Date,
    lastModified: Date,
    versions: [String],
    upvotes: {type: [Schema.Types.ObjectId], ref: 'User'},
    downvotes: {type: [Schema.Types.ObjectId], ref: 'User'},
    comments: {type: [Schema.Types.ObjectId], ref: 'Comment'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    status: Boolean
});
mongoose.model('Comment', CommentSchema);

```
```js
Tags:
var TagsSchema = mongoose.Schema({
    text: String,
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    comments: {type: [Schema.ObjectId], ref: 'Comment'},
    preview: Number
});
mongoose.model('Tags', TagsSchema);

```
```js
Company:
var CompanySchema = mongoose.Schema({
     name: String,
    location: {
        address: String,
        state: String,
        country: String,
        zipcode: Number
    },
    turnover: Number
});

mongoose.model('Company', CompanySchema, 'company');

```
```js
University:
var UniversitySchema = mongoose.Schema({
    name: String,
    location: {
        address: String,
        state: String,
        country: String,
        zipcode: Number
    },
    intake: Number
});
mongoose.model('University', UniversitySchema, 'university');

```

 

### Languages and Frameworks

#### Front-end

Handlebar.js, jQuery, Bootstrap

·       
**Handlebars** provides the power necessary to let you build semantic templates effectively with no
frustration. Handlebars is largely compatible with Mustache templates.

·       
**jQuery** is a fast, small, and feature-rich
JavaScript library. It makes things like HTML document traversal and
manipulation, event handling, animation, and Ajax much simpler with an
easy-to-use API that works across a multitude of browsers.

·       
**Bootstrap**, a sleek, intuitive, and powerful mobile
first front-end framework for faster and easier web development.

#### Back-end

Node.js, Express, MongoDB

·       
**Node.js**
is a server-side JavaScript execution environment. 

·       
**Express**
is lightweight framework used to build web application in Node. Express is
inspired by the Ruby framework, Sinatra. 

·       
**MongoDB**
is a schema less NoSQL database system. 

·       
User Authentication is done using **passport.js.** It isauthentication middleware for Node.js. Extremely flexible and
modular, passport.js can be unobtrusively dropped in to any Express-based web
application.
