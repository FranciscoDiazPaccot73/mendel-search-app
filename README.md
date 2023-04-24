# Challenge tecnico para Mendel.
Autor: **[Francisco Diaz Paccot](https://franciscodiazpaccot.dev)**.

## [Live Demo](https://mendel-search-app.vercel.app/)

## Tecnologias usadas.
Para este challenge tecnico se utilizo **NextJs, Tailwind, Typescript, ReactJs, NodeJs**

## Dependencias
Para poder cumplir de la mejor forma con los puntos del challenge, se utilizaron las siguientes dependencias adicionales:

| Dependencia           | Detalle                                    |
| --------------------- | ------------------------------------------ |
| clsx                  | Manejo de clases en componentes            |
| framer-motion         | Animaciones                                |
| react-query           | Peticiones del lado del cliente            |
| axios                 | Realizar peticiones fetch                  |
| query-string          | Formateo de query params en las request    |


## Ambiente local
Para poder correr la aplicacion en un ambiente local, se debera incorporar un archivo `.env.local` para poder cargar las keys de firebase localmente, ya que para los fines de este proyecto estan declaradas en Vercel. En el caso de ser necesario, solicitarlo.

Una vez se haya hecho clone/fork del proyecto, correr `yarn` o `npm i` para poder instalar las dependencias y tener todo disponible para poder ejecutar `yarn dev` o `npm run dev` y poder tener disponible la aplicacion en el browser en `http://localhost:3000/`

## Scripts disponibles.
```bash
  yarn dev
  yarn build
  yarn start
  yarn lint
```

## Arquitectura basica de archivos
```
project
└───components
│   │   Author.tsx
|   |   Card.tsx
|   |   ...
|
└───pages
|   │   _app.tsx
|   │   _document.tsx
|   │   index.tsx
│   └───api
│       │   author.ts
│       │   book.ts
│       │   search.ts
|
└───services
|   │   index.ts
|
└───store
|   │   actions.ts
|   │   index.tsx
|   │   reducers.ts
|
└───styles
|   │   globals.css
|
└───utils
|   │   constants.ts
|   │   index.ts
```

## Endpoints disponibles
| Endpoint           | Detalle                                                                               |
| ------------------ | ------------------------------------------------------------------------------------- |
| /api               | Se usa tanto para obtener las tendencias o busqueda si se llega con un queryParam `q` |
| /api/author        | Informacion sobre un autor. Recibe como queryPara el `id`                             |
| /api/book          | Informacion sobre un libro. Recibe `limit` y `id` como queryParam                     |
| /api/search        | Hace busqueda sobre el listado de libros. Recibe `limit`, `offset` y `q`              |


## Puntos a mencionar sobre el challenge.
- No se pudo realizar todo con SSR ya que el API contesta demasiado lento y degradaba mucho la experiencia.


**Carga SSR**

<img width="982" alt="Screen Shot 2023-04-23 at 22 06 30" src="https://user-images.githubusercontent.com/55720334/233877896-db7d618d-5cd7-4517-bdab-6e26895d7b7b.png">


**Carga client side**

<img width="622" alt="Screen Shot 2023-04-23 at 22 06 21" src="https://user-images.githubusercontent.com/55720334/233877923-049a8752-5f89-4101-8257-f0ac51d16816.png">

- Debido a que el API es algo incosistente, muchas veces trae libros sin detalles o autores sin bio.
- Al ingresar al sitio se obtienen las tendencias del dia, o si se tiene el queryParam `q` trae la busqueda que querramos. Funcionalidad para poder compartir links de busquedas.
- Se opto por levantar el detalle de un libro en un modal con skeletons, dado a que al responder de manera muy lenta el api degradaba mucho la experiencia hacerlo en una pagina nueva.
- Para el paginado, se opto por usar infinite scroll en vez de un paginado normal.
- Se intento hacer este challenge lo mas perfomante posible para la carga de la app.


## Metricas de la app en su version desktop.
<img width="603" alt="Screen Shot 2023-04-23 at 22 00 35" src="https://user-images.githubusercontent.com/55720334/233877808-d5cc96ae-1f40-4d84-9108-b7325e145fc1.png">

## Metricas de la app en su mersion mobile.
<img width="603" alt="Screen Shot 2023-04-23 at 22 01 00" src="https://user-images.githubusercontent.com/55720334/233877823-1da74970-81b7-42e8-a25b-717332a200b7.png">





