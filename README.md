# my_diary

[![Build Status](https://travis-ci.org/nwashangai/my_diary.svg?branch=develope)](https://travis-ci.org/nwashangai/my_diary)
[![Coverage Status](https://coveralls.io/repos/github/nwashangai/my_diary/badge.svg?branch=master)](https://coveralls.io/github/nwashangai/my_diary?branch=develope)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad70ca3a7de1905fe026/maintainability)](https://codeclimate.com/github/nwashangai/my_diary/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ad70ca3a7de1905fe026/test_coverage)](https://codeclimate.com/github/nwashangai/my_diary/test_coverage)

An online journal where users can pen down their thoughts and feelings.

## **Getting Started**

These instructions bellow will guide you in getting a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites

You will need to have the following softwares installed on your local machine

  - node js & npm
  - yarn

## Installing

A step by step series of instruction to install and get a development env running

```
npm install
yarn install
```
To build to ES2015 run the command
```
npm run build
```
To start the server run
```
npm start
```
Kudos :+1: now your API server is running at http://localhost:3000/

## Running the tests

To run mocha test
```
npm run test
```
*Note: you do not need to start your server when running test, the mocha test run automatically creates an instance of the server on port 3000 and therefore will generate an error when your test tries to create identical server*

## Credits

*Credits@Andela bootcamp program*