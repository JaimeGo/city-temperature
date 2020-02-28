# city-weather

## Deployment de backend

heroku create wsserver-temperature

git remote rename heroku heroku-backend

git subtree push --prefix backend heroku-backend master

## Deployment de frontend

heroku create -b https://github.com/mars/create-react-app-buildpack.git temperature-hour

git remote rename heroku heroku-frontend

git subtree push --prefix frontend heroku-frontend master

## Notas

- La llave de darksky se guarda como variable de entorno del backend (DARKSKY_KEY).

- Se ocupa ESM en el backend para contar con las características de las versiones más modernas de Javascript (particularmente ES modules).
