import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {          

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsua: string

  constructor(
    private authService: AuthService, //Override do TypeScript, serve para injetar a dependência
    private router: Router
    ) { }

    ngOnInit() {
      window.scroll(0,0)
  }

  confirmSenha(event: any)  {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUsua = event.target.value

  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsua
    
    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão divergentes. Tente novamente!')
    } else {
             /*Pega os valores inseridos na variável user,
        transforma em Json para que o Backend entenda a requisição*/
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        // Redireciona o usuário
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }

  }

}