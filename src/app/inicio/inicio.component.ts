import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { isTemplateExpression } from 'typescript';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  postagemUtil: Postagem = new Postagem()
  
  listaPostagens: Postagem[]

  nome = environment.nome
  foto = environment.foto
  id = environment.id

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  order: number 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    public auth: AuthService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
/* Caso de F5 (atualize a página) será informado e solicitado que o usuario entre novamente */
    // if (environment.token == '') {
    //   alert('Sua sessão expirou, faça o login novamente.')
    //   this.router.navigate(['/entrar'])
    // } 
    // this.authService.refreshToken();
    this.getAllPostagens();
    this.layoutDeslogado();
  }

  layoutDeslogado() {
    let div : HTMLElement = document.querySelector("#anuncioGeral") as HTMLElement
    if (environment.token == ''){
      div.classList.toggle("col-md-12")
    }
  }

  getAllPostagens (){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp 
      this.listaPostagens.sort((a,b) => (a.preco < b.preco) ? -1 : 1) //Ordenando atraves do maior valor para o menor
    })
  }

  findByIdUsuario(){
    this.authService.refreshToken()
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.usuario.postagem.sort((a,b) => (a.preco < b.preco) ? -1 : 1) //Ordenando atraves do maior valor para o menor)
    })

  }

  publicar(){

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem ()
      this.getAllPostagens()
    })

  }
  sair(){
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

findByIdPostagem(id: string){
    this.postagemService.getByIdPostagem(Number(id)).subscribe((resp: Postagem) => {
      this.postagemUtil = resp
    })
  }
  apagar(){ 
    this.postagemService.deletePostagem(this.postagemUtil.id).subscribe(() => {
      alert('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
      
    })
   }

   atualizar(){
    this.postagemService.putPostagem(this.postagemUtil).subscribe((resp: Postagem) => {
      this.postagemUtil = resp
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
      this.postagemUtil = new Postagem ()
      this.getAllPostagens()
      this.findByIdUsuario()
    })
  }

}