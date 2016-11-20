# frontend-nanodegree-mobile-portfolio

Udacity Front-End Web Developer Nanodegree Project 4


## Project overview

The objective is to optimize a specified online portfolio for speed. In particular, optimize the critical rendering path and make this page render as quickly as possible.

## Getting started
Optimized version of the portfolio

* [Repository](https://github.com/mmarinm/frontend-nanodegree-mobile-portfolio)

* [Live Site](https://mmarinm.github.io/frontend-nanodegree-mobile-portfolio/)

Original version of the portfolio

* [Repository](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)

* [Live Site](http://cameronwp.github.io/udportfolio/)

## To Build Project Locally

clone the repo, and navigate to its root directory

With gulpJs, nodeJs & Npm ( generally included in nodeJs ) installed, in the project directory simply run:

npm install

and once dependencies are finished installing

gulp

## Part 1: Optimize PageSpeed Insights score for index.html

### Specification

Identify and perform optimizations to achieve a PageSpeed Insights score of 90 for both mobile and desktop.

### Steps taken

* Compressed and resized  images using Gulp automation tool
* Inlined minified CSS
* Minified Javascript using Gulp
* Changed Google Analytics script and Web Fonts to async version

### PageSpeed Insights Score

* 96/100 Mobile
* 97/100 Desktop

## Part 2: Optimize Frames per Second in pizza.html

### Specifications

* Identify and perform optimizations ensuring a consistent frame rate at 60fps when scrolling
* Time to resize pizzas in pizza.html is less than 5 ms as shown in the browser console
* Provide a README file that documents the steps to run the application and explains the optimizations taken

### Steps taken

* Changed querySelector() to getElementById()
* Changed querySelectorAll() to getElementsByClassName()
* Created calcNumofPizza() that limits amount of created pizza based on screen size
* Removed all interactions with the DOM out of the loops
* Refactored updatePositions() function by separating code in onScroll(), requestTick() and update() functions
* Implemented requestAnimationFrame() function to optimize rendering, and implemented logic that prevents calling of requestAnimationFrame function when is unneccessary
* added translate3d property inside update function to move pizza elements for preventing layout issues
* Added backface-visibility property to sliding pizzas to make sure they get promoted on it's own layer and implemented vendor prefixes
* Removed computation of pizza size outside of loop in separate function sizeSwitcher()

### Optimized Scrolling 
* [Image](https://github.com/mmarinm/frontend-nanodegree-mobile-portfolio/blob/master/ScrollingPerformanceShowcase.PNG) of scrolling performance before and after optimization

### Time to resize Pizza

* Optimized 0.63 ms
* Original  199.44 ms
