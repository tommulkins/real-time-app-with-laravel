# This is a sample real time single page forum app.

Create local .env from env.example.  MySQL db recommended or use Homestead(Vagrant) that comes with.

You will need your own Pusher account and install in .env: https://www.pusher.com

## To install
npm install

php artisan migrate

php artisan db:seed

## To run

Laravel - php artisan serve

Vue - npm run watch

*  Will run on localhost:8000 by default.
