import fs from "fs"
import { nanoid } from "nanoid"


export default class ProductManager {
  constructor() {
    this.path = "./src/models/products.json"

  }

  getProducts = async (info) => {
    const { limit } = info
    try {
      if (fs.existsSync(this.path)) {
        const productlist = await fs.promises.readFile(this.path, "utf-8")
        const productlistparse = JSON.parse(productlist)
        const productlistsliced = productlistparse.slice(0, limit)
        return productlistsliced
      }
      else {
        console.error("Could not list the products")
        return
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }


  getProductbyId = async (id) => {
    const { pid } = id
    const allproducts = await this.getProducts({})
    const found = allproducts.find(element => element.id === pid)
    if (found) {
      return found
    }
    else {
      console.error("Product not found")
    }
  }



  // //GENERATE ID 
  // generateId = async () => {
  //   if (fs.existsSync(this.path)) {
  //     const listproducts = await this.getProducts({})
  //     const counter = listproducts.length
  //     if (counter == 0) {
  //       return 1
  //     }
  //     else {
  //       return (listproducts[counter - 1].id) + 1
  //     }
  //   }
  // }
  //CREATE
  addProduct = async (obj) => {
    const { title, description, price, thumbnail, category, status = true, code, stock } = obj
    if (title === undefined || description === undefined || price === undefined || category === undefined || status === undefined || code === undefined || stock === undefined) {
      console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO")
      return
    }
    else {
      const listproducts = await this.getProducts({})
      const codigorepetido = listproducts.find(elemento => elemento.code === code)
      if (codigorepetido) {
        console.error("EL CODIGO DEL PRODUCTO QUE DESEA AGREGAR ES REPETIDO")
        return
      }
      else {
        const id = nanoid(2)
        const productnew = {
          id, title, description, price, thumbnail, category, status, code, stock
        }
        listproducts.push(productnew)
        await fs.promises.writeFile(this.path, JSON.stringify(listproducts, null, 2))
      }
    }
  }


  //UPDATE
  updateProduct = async (id, obj) => {
    const { pid } = id
    const { title, description, price, thumbnail, category, status, code, stock } = obj
    if (title === undefined || description === undefined || price === undefined || category === undefined || status === undefined || code === undefined || stock === undefined) {
      console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO PARA SU ACTUALIZACION")
      return
    }
    else {
      const allproducts = await this.getProducts({})
      const codigorepetido = allproducts.find(elemento => elemento.code === code)
      if (codigorepetido) {
        console.error("EL CODIGO DEL PRODUCTO QUE DESEA ACTUALIZAR ES REPETIDO")
        return
      }
      else {

        const newProductsList = allproducts.map(elemento => {
          if (elemento.id === pid) {
            const updatedProduct = {
              ...elemento,
              title, description, price, thumbnail, code, status, category, stock
            }

            return updatedProduct


          }
          else {
            return elemento
          }
        })
        await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, 2))

      }

    }
  }


  //DELETE
  deleteProduct = async (id) => {
    const { pid } = id
    const allproducts = await this.getProducts({})
    const productswithoutfound = allproducts.filter(elemento => elemento.id !== pid)
    await fs.promises.writeFile(this.path, JSON.stringify(productswithoutfound, null, 2))
  }


}
