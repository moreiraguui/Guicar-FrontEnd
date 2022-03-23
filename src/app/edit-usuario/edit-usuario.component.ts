import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string
  tipoUsua: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUsua = event.target.value
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsua
    
    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão divergentes. Tente novamente!')
    } else {
      /*Pega os valores inseridos na variável user,
      transforma em Json para que o Backend entenda a requisição*/
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        // Redireciona o usuário
        this.router.navigate(['/inicio'])
        alert('Usuário atualizado com sucesso, faça o login novamente!')
                      
        environment.token =  ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
       

        this.router.navigate(['/entrar'])
      })
    }

  }                             

  findByIdUsuario (id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}

  
