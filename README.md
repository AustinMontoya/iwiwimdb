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

## Assumptions made:
- The size of the sample dataset is not representative of a real world scenario; thus, filtering on the server is justified rather than fetching all data and filtering on the client (which would be much faster in practice here)
- 