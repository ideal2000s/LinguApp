# Lingu Marketplace

1.	BDD. Always create your tests first!
2.	Push your work to your branch at least daily. Also work in progress.
3.	Have a sense of urgency! We want quick turnaround times for opening, reviewing and merging pull requests.
4.	Sprint management in Github.
5.	Master branch should always be working project. Development should be in separate branches. No direct commits to master.


## Project overview
Lingu is a marketplace platform for authoring and selling language courses.

The first production release should allow authors to create and preview lessons and tasks, and let students complete the lesson online.

Release 2 of the platform will allow teachers to post live classes, and allow students to make reservations.

Release 3 will include marketplace functionality for transactions via Stripe.

## Useful links
1. [Ruby Style Guide](https://rubystyle.guide/){:target="_blank"}
2. [SOLID](https://en.wikipedia.org/wiki/SOLID)
3. [Polymorphic associations](https://github.com/gitlabhq/gitlabhq/blob/master/doc/development/polymorphic_associations.md)

Add yours...

## Running application locally

#### Mac OS X dependencies

```               
brew update & brew upgrade
brew install vips
```
#### Generic Setup
```              
cp .env.example .env   
bundle
yarn install
rake db:create      
```           

#### Seed production data

https://lingudev.slack.com/files/U18U5LJTT/F01FWJUPLU9/lingu.sql.gz

``` 
gzcat ./lingu.sql.gz | psql -d lingu_development
```

### Run application
```              
bin/webpack-dev-server
bin/rails server
```  
or use `foreman start` to start server and webpack-dev-server with one command 

Go to http://localhost:3000/users/sign_in.

Sign in with Google and update role for your user from Rails console:

`User.last.admin!`

## Docker and docker-compose

```
docker-compose build app
docker-compose run --rm app bundle install
docker-compose build webpack
docker-compose run --rm webpack yarn install
docker-compose run --rm app rails db:migrate db:seed
docker-compose up -d
```
Visit http://localhost:3000/students/lessons/1

## Front-end

Student UIs are built with ReactJS.
User UIs for admin area are built with Bootstrap theme 'Falcon'. Please use markup from theme only:
https://prium.github.io/falcon/



## Deployment to production

Production deployment are created from Github releases and deployed to kubernetes cluster.


## Run ruby console:
`docker-compose run --rm app bin/rails c`

## Publish the lesson:
`docker-compose run --rm app bin/rails r 'Lesson.update(lesson_id, status: :approved, published: true)'`

## Update translations
`rake i18n:js:export` or `docker-compose run app rake i18n:js:export`

## Reset lesson session
`docker-compose run --rm app bin/rails r 'LessonSession.update_all(current_task_session_id: nil); LessonSession.destroy_all'`

## Hubspot Integration

    - Create a new Service Hub account (it is free by default).    
    - Click on a gear icon on top right corner.
    - Expand Integrations.
    - Click 'API Key' where generate a new key.
    - Paste key generated to .env as a HUBSPOT_API_KEY variable's value.
    
    Details: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key 