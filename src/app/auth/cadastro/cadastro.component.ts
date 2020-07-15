import { NotificacaoService } from './../../main/core/services/utils/notificacao.service';
import { AuthService } from './../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioCadastroRequest } from '../models/usuario-cadadastro-request.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.sass']
})
export class CadastroComponent implements OnInit {

  usuarioCadastro: UsuarioCadastroRequest = new UsuarioCadastroRequest();

  constructor(private router: Router, private authService: AuthService, private notificacaoService: NotificacaoService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  cadastrar() {
    this.notificacaoService.exibirMensagemSucesso('Usuário cadastrado com sucesso');

  }

  cancelar() {
    this.router.navigate(['']);
  }



}
