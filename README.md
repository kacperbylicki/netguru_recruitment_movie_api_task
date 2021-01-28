# NETGURU Junior Node.js recruitment task

I've decided to make it as simple as possible, so You'll not find any webpack/babel/ts here.

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

⚠️ If You're using MacOs with docker-compose, You have to replace `${POSTGRES_HOST}` and `${REDIS_HOST}` env variables in docker-compose.yml with `host.docker.internal`.

## ⚠️ Issue

I can't manage what causes `Error 137` of `movie_usage` Docker container during PR tests

Error 137 is OOM error, but memory usage of those containers during tests is ~100MB, while Github runner memory limit is 6.971GB.

In local environment or in DO Droplet everything runs as it should.

## Usage

You can use this API with e.g. Postman. The address at which the API will be available by default in Your local environment is localhost:3001

## Endpoints

### Endpoints that not require Authentication

1. Authentication: `POST /api/v1/auth`

    Make request with following payload:

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

    If User is authenticated but not yet added any movie, You'll get response as:

    ```
    {
        "count": 0,
        "data": []
    }
    ```

    If User is authenticated and added any movie, You'll get response as:

    ```
    {
        "count": 1,
        "data": [
            {
                "_id": "8139ace02f4e8a5ebd10977aace56883805f525f",
                "title": "Interstellar",
                "released_at": "2014-11-07T00:00:00.000Z",
                "genre": "Adventure, Drama, Sci-Fi",
                "director": "Christopher Nolan"
            }
        ]
    }
    ```

    If User is not authenticated or authentication failed, You'll get response as:

    ```
    Status: 403 Forbidden

    {
        "error": "access_refused"
    }
    ```

    If You not provided Authorization header or x-access-cookie is not set, You'll get response as:

    ```
    Status: 400 Bad Request

    {
        "error": "invalid_payload"
    }
    ```

2. Insert new movie by it's title: `POST /api/v1/movies`

    Example payload of movie insertion request:

    ```
    {
        "title": "Tenet"
    }
    ```

    If movie of this title wasn't added yet, You'll get response as:

    ```
    {
        "insert": 1,
        "result": "movie_inserted_successfully",
        "data": {
            "Title": "Tenet",
            "Released": "03 Sep 2020",
            "Genre": "Action, Sci-Fi, Thriller",
            "Director": "Christopher Nolan"
        }
    }
    ```

    If movie was added previously, You'll get response as:

    ```
    {
        "insert": 0,
        "result": "movie_exists",
        "data": []
    }
    ```

    If movie of provided title not exists in OMBD service, You'll get response as:

    ```
    {
        "insert": 0,
        "result": "movie_not_found",
        "data": []
    }
    ```

    If `Basic` role User exceed monthly usage of 5 movie insert, You'll get response as:

    ```
    Status: 403 Forbidden

    {
        "error": "monthly_usage_exceed"
    }
    ```

    If User is not authenticated or authentication failed, You'll get response as:

    ```
    Status: 403 Forbidden

    {
        "error": "access_refused"
    }
    ```

    If You not provided Authorization header or x-access-cookie is not set, You'll get response as:

    ```
    Status: 400 Bad Request

    {
        "error": "invalid_payload"
    }
    ```

