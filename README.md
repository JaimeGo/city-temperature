# City temperature app

## Deployment de backend

En primer lugar es necesario setear la variable de entorno DARKSKY_KEY. Además es necesario obtener una instancia de Heroku-Redis. Yo hice ambas cosas a través de la página web de Heroku.

Desde la raiz del repo:

```
heroku create wsserver-temperature

git remote rename heroku heroku-backend

git subtree push --prefix backend heroku-backend master
```

## Deployment de frontend

Es necesario setear la variable de entorno REACT_APP_BACKEND_URL.

Desde la raiz del repo:

```
heroku create -b https://github.com/mars/create-react-app-buildpack.git temperature-hour

git remote rename heroku heroku-frontend

git subtree push --prefix frontend heroku-frontend master
```

## Notas

- Se ocupa el paquete "esm" en el backend para contar con las características de las versiones más modernas de Javascript (particularmente ES modules).

- Se ocupa el paquete "ws" para la comunicación con Websockets en el backend, y un objeto de una api web llamado Websocket en el frontend.
