import { Injectable } from '@angular/core';

declare var PagSeguroDirectPayment: any;

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  email: string = "pedrohenriquetpr@gmail.com";
  tokenSandbox: string = "4FAE9F109FFA41398BAF1A5D039AA1D0";
  url: string = `https://ws.pagseguro.uol.com.br/v2/sessions?email=${this.email}&token=${this.tokenSandbox}`;

  constructor() { }

  setSessionId(){

    // Realizar a busca do id
    let idSessao = "";
    PagSeguroDirectPayment.setSessionId('29a3e22260d24b9f97da64b161ba7394');
  }

  getMeiosDePagamento(): any{
    PagSeguroDirectPayment.getPaymentMethods({
      amount: 500.00,
      success: function(response) {
          console.log(response)
      },
      error: function(response) {
          console.log("Erro ao buscar meios de pagamento: " + response)
      },
      complete: function(response) {
          // Callback para todas chamadas.
      }
  });
  }
}
