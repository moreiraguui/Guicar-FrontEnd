import { Usuario } from "./Usuario"

export class Postagem{
    public id: number
    public nome: string
    public marca: string
    public modelo: string
    public foto: string
    public preco: number
    public ano: number
    public data: Date
    public usuario: Usuario
    
}