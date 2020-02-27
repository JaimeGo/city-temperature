# city-weather

## Deployment of backend

heroku create wsserver-temperature
git remote rename heroku heroku-backend
git subtree push --prefix backend heroku master

## Deployment of frontend

heroku create -b https://github.com/mars/create-react-app-buildpack.git temperature-hour
git remote rename heroku heroku-frontend
git subtree push --prefix frontend heroku master
