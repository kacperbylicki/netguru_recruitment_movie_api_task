# NETGURU Junior Node.js recruitment task

I've decided to make it as simple as possible, so You will not find any webpack/babel/ts here.

## Table of Contents

* [Stack](#stack)
* [Setup](#setup)
* [Endpoints](#endpoints)

## Stack

* Express [4.17.1] - REST API framework to put app together
* Postgres [13.1] - Main database that stores movies inserted by Users
* Redis [6.0.9] - Used as database to store and update Basic User usages
* Jest [26.6.3] - Used for testing
* Github Actions -  Pull Request CI

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

### Endpoints that not require Authentication

1. Authentication: `POST /api/v1/auth`

    Make request with following JSON payload:

    ```
    {
        "username": "premium-jim"
        "password": "GBLtTyq3E_UNjFnpo9m6"
    }
    ```

    You'll get response as:

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
    }
    ```

    Token will be set in x-access-token cookie, but if You want You can copy it and paste in `header: Authorization` while making `/api/v1/movies` requests.

### Endpoints that require Authentication (dependent on the current user)

1. Get list of movies: `GET /api/v1/movies`

2. Insert new movie by it's title: `POST /api/v1/movies`



