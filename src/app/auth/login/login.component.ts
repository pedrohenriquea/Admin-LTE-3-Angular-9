import { NotificacaoService } from 'src/app/main/core/services/utils/notificacao.service';
import { AuthService } from './../services/auth.service';
import { UsuarioRequest } from '../models/usuario-request.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioRequest = new UsuarioRequest();

  constructor(private notificacaoService: NotificacaoService, private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.spinner.show();
    this.spinner.hide();
    if (this.authService.login(this.usuario)) {
      this.router.navigate(['prefeitura']);
    } else {
      this.notificacaoService.exibirMensagemAtencao('Usuário ou senha inválidos');
    }

    
  }

}
