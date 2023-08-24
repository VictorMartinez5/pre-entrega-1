# Curso de Programación Backend CoderHouse

# Consigna

![Consigna parte 1](./consignas/1.png)
![Consigna parte 2](./consignas/2.png)
![Consigna parte 3](./consignas/3.png)
![Consigna parte 4](./consignas/4.png)
![Consigna parte 5](./consignas/5.png)
![Consigna parte 6](./consignas/6.png)



### Run Command : 
Antes de comenzar ejecutar este comando:

```sh
npm i //Este comando instalara todas las dependencias usadas en este proyecto 
```


Lo siguiente sera iniciar el servidor con:

```sh
npm run dev 
```


### Structure :

Contamos con el fichero principal **app**, este se usa para generar un servidor mediante express en el puerto **8080** teniendo como ruta principal **http://localhost:8080/api**


La carpeta **controllers** cuenta con los siguiente ficheros  **productManager** y **cartManager**. Estos, a su vez contienen internamente los siguientes métodos respectivamente para el manejo de productos:

**ProductManager.js:**
```
- addProduct
- getProducts
- getProductByid
- updateProduct
- deleteProduct
```

**ProductManager.js:**
```
- getCarts
- getCartbyId
- addCart
- addProductToCart
```




