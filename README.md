# NETGURU Junior Node.js recruitment task

I've decided to make it as simple as possible, so You will not find any webpack/babel/ts here.

## Table of Contents

* [Stack](#stack)
* [Setup](#setup)

## Stack

* Express [4.17.1] - REST API framework to put app together
* Postgres [13.1] - Main database that stores movies inserted by Users
* Redis [6.0.9] - Used as database to store and update Basic User usages
* Jest [26.6.3] - Used for testing
* Github Actions for PR CI

## Prerequisites

You need to have `docker` and `docker-compose` installed

## Setup

* Clone this repository with `git clone`
* Create new `.env` file in main directory. See `.env.example` to see example env variables. It's obligatory to set same variables names. 
* Run `docker-compose up -d` to setup containers
* To run tests type `docker exec movie_backend yarn test`

## Usage

You can use this API with e.g. Postman. The address at which the API will be available by default in Your local environment is localhost:3001

## Endpoints

1. Authentication Endpoint: `POST /api/v1/auth`


### Endpoints that require Authentication



