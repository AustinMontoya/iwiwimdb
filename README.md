# IWIWIMDB (I wish I were IMDB)

IWIWIMDB is a simple single page app built with Bootstrap 3, Angular, and Express.

## Installation
1. Clone this repo
1. Run `npm install` in the top-level directory of the project

## Running the App
1. `node server.js`

## Running the Tests
1. Install karma:
```npm install -g karma```

To run the unit tests:
```scripts/test.sh```

## Some notes:
- The size of the sample dataset is not representative of a real world scenario; thus, filtering on the server is justified rather than fetching all data and filtering on the client (which would be much faster in practice here)
- Not much attention has been paid to a clean server architecture. I have historically done most backend development with ASP.Net MVC (though I'm much more interested in pursuing Node.js!), so I didn't want to fumble around with Mongoose or study the organization schemes of other Express projects.
- I totally acknowledge that this is not ready for production (i.e. assets not combined/minified, no configurations for local vs production db, etc). I felt that it would be an excercise in managing Grunt and config files, and that the time spent there could be better spent adding a new feature (Favorites) and focusing on testing.
- Light on custom css, as Bootstrap does most of the work. Because of this, no preprocessor was used.
- Probably doesn't work in IE8 and below