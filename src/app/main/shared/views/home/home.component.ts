import { AuthService } from './../../../../auth/services/auth.service';
import { UsuarioResponse } from './../../../../auth/models/usuario-response.model';
import { Component, OnInit } from '@angular/core';
import { PaymentMethods } from '../../model/payment-methods.model';

declare var $: any;
declare var PagSeguroDirectPayment: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  usuarioLogado: UsuarioResponse;
  meiosDePagamento: PaymentMethods;
  exibirQuantidadeParcelas: boolean = false;
  
  // Dados input pagamento
  numeroCartao: string;
  bandeiraSelecionada: string;
  cvv: string;
  mesExpiracao: string;
  anoExpiracao: string;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    PagSeguroDirectPayment.setSessionId('94e54b066ab749099370d3acef4d9ad7');

  }

  getMeiosDePagamento(): any {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: 500.00,
      success: function (response) {
        this.meiosDePagamento = response.paymentMethods;
        console.log(this.meiosDePagamento)
      },
      error: function (response) {
        console.log("Erro ao buscar meios de pagamento: " + response)
      }
    });
  }

 
  verificaBandeiraCartao(event: any) {
    var numeroCartao = event.target.value;
    var qtdCaracteres = numeroCartao.length;

    if (qtdCaracteres >= 6) {
      this.exibirQuantidadeParcelas = true;

       // Busca a bandeira do cartão digitado
      PagSeguroDirectPayment.getBrand({
        cardBin: numeroCartao,
        success: function (response) {
          var bandeira = response.brand.name;
          $ ('#bandeiraSelecionadaHidden').val(bandeira)
          $(' .bandeiraCartao').html("<img src=https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + bandeira + ".png>");
         

          // Busca a quantidade e valores das parcelas
          PagSeguroDirectPayment.getInstallments({
            amount: 118.80,
            maxInstallmentNoInterest: 2,
            brand: bandeira,
            success: function (response) {
              $('#qtdParcelas').empty();
              $('#qtdParcelas').append("<option>Selecione</option>")
              $.each(response.installments, function (i, obj) {
                $.each(obj, function (i2, obj2) {
                  var numberValue = obj2.installmentAmount;
                  var number = "R$ " + numberValue.toFixed(2).replace(".", ",");
                  $('#qtdParcelas').append("<option value=" + obj2.installmentAmount + "> " + obj2.quantity + " parcelas de " + number + " </option>")
                });

              });
            },
            error: function (response) {
              console.log("Erro ao buscar valores das parcelas.")
            }
          });

        },
        error: function (response) {
          alert('Cartão não reconhecido')
          console.log('Cartão não reconhecido');
          $(' .bandeiraCartao').empty();
        }
      });
    } else {
      $(' .bandeiraCartao').empty();
      this.exibirQuantidadeParcelas = false;
    }
  }

  createCardToken(){

    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.numeroCartao, // Número do cartão de crédito
      brand:  $ ('#bandeiraSelecionadaHidden').val(), // Bandeira do cartão
      cvv: this.cvv, // CVV do cartão
      expirationMonth: this.mesExpiracao, // Mês da expiração do cartão
      expirationYear: this.anoExpiracao, // Ano da expiração do cartão, é necessário os 4 dígitos.
      success: function(response) {
       $ ('#cardTokenHidden').val(response.card.token)
      },
      error: function(response) {
        console.log(response)
      }
   });
  }

  getSenderHash(){
    PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      var hash = response.senderHash; //Hash estará disponível nesta variável.
      console.log(hash)
      $('#senderHashHidden').val(hash);
  });
  }

  pagar(){
    this.createCardToken();
    this.getSenderHash();
    console.log(this.numeroCartao);
    console.log( $ ('#bandeiraSelecionadaHidden').val());
    console.log(this.cvv);
    console.log(this.mesExpiracao);
    console.log(this.anoExpiracao);
  }


}
