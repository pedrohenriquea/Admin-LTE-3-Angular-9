import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private toastr: ToastrService) { }

exibirMensagemSucesso(message){
    this.toastr.success(message, 'Mensagem')
}

exibirMensagemErro(message){
    this.toastr.error(message, 'Mensagem')
}

exibirMensagemInformacao(message){
    this.toastr.info(message, 'Mensagem')
}

exibirMensagemAtencao(message){
    this.toastr.warning(message, 'Mensagem')
}


}
