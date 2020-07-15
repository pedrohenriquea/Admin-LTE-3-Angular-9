import { AuthService } from './../../../../auth/services/auth.service';
import { UsuarioResponse } from './../../../../auth/models/usuario-response.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  usuarioLogado: UsuarioResponse;

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {



  }

}
