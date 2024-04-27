# Instaliter (Instagram Clone)

>A clone of Instagram web with React.js, Inertia.js and Laravel

<img src="./src/home-page.png" alt="Homepage">

## Features

<ul>
    <li>
        Register, Login, logout<br>
        <img src="./src/login.jpeg">
        <img src="./src/register.jpeg">
    </li>
    <li>
        Change profile picture, name, username, email and delete account<br>
        <img src="./src/edit-profile.jpeg">
    </li>
    <li>
        Create and Delete Post<br>
        <img src="./src/create-post.png">
    </li>
    <li>
        Edit image and caption Post<br>
        <img src="./src/edit-post.png">
    </li>
    <li>
        Add and delete comment<br>
        <img src="./src/show-post.jpeg">
    </li>
    <li>
        Dark Mode<br>
        <img src="./src/light-mode.png">
        <img src="./src/home-page.png">
    </li>
</ul>


## App Setup

```
git clone https://github.com/bsrmdn/instaliter.git

composer install 

cp .env.example .env 

php artisan cache:clear 

composer dump-autoload 

php artisan key:generate

composer require laravel/breeze --dev

php artisan breeze:install react --dark

php artisan serve
```
Create the DB
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=instaliter
DB_USERNAME=root
DB_PASSWORD=
```
Now migrate your DB
```
php artisan migrate

```

Now run this command to start the project 
```
npm i

npm run dev
```

You should be good to go!

