# D&D Character Sheet Viewer

This is the front-end of a service to manage Dungeons and Dragons character sheets.

This includes, but will not be limited to:

|Race                      |Class                       | Personality|
|--------------------------|----------------------------| -----------|
|Ability Score Improvements|Hit Dice                    | Name       |
|Languages                 |Primary Ability             | Sex        |
|Age                       |Saving Throw Proficiencies  | Size       |
|Alignment                 |Armor & Weapon Proficiencies| Ideals     |

Certain details of a character will be computed by a more robust system, and made accessible through an API. One which has access to the enormous amount of detail necessary to make decisions on things such as ability score improvements based on level and class, or multiclassing. This front end will only be responsible for displaying the information it receives from said API.

## Getting Started
```sh
# First and foremost, install the project's dependencies
$ npm install  

# To see a local demo of the app
$ npm run demo  

# Work on the codebase and see your changes updated in the browser
$ npm run dev  

# Create an optimized, production-ready version of the app
$ npm run release
```

## Style Guide
Please read `./source/scss/README.md` before creating new styles, as it describes in further detail how to do so.

## Technology Used
This project makes use of [Vue.js](https://vuejs.org/), which is a front-end JavaScript framework used for reactive data-binding to elements within a view.

The application uses a combination of [Webpack](https://webpack.js.org/) and [Gulp.js](http://gulpjs.com/) for the build and development process.

# Contributor List
1. [Sal Torcivia](http://saltor.nyc) (creator)
