import { AuthService } from './../../../../auth/services/auth.service';
import { UsuarioResponse } from './../../../../auth/models/usuario-response.model';
import { Component, OnInit } from '@angular/core';
import { PaymentMethods } from '../../model/payment-methods.model';
import { NumberValueAccessor } from '@angular/forms';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    PagSeguroDirectPayment.setSessionId('3d03d5c109b140dbafaf3382f89dd120');
    this.getMeiosDePagamento();

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
      },
      complete: function (response) {
        // Callback para todas chamadas.
      }
    });

  }

  // Pegar a bandeira do cartão
  verificaBandeiraCartao(event: any) {
    var numeroCartao = event.target.value;
    var qtdCaracteres = numeroCartao.length;

    if (qtdCaracteres >= 6) {
      this.exibirQuantidadeParcelas = true;
      PagSeguroDirectPayment.getBrand({
        cardBin: numeroCartao,
        success: function (response) {
          var bandeira = response.brand.name;
          $(' .bandeiraCartao').html("<img src=https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + bandeira + ".png>");

          // Exibe a quantidade e valores das parcelas
          PagSeguroDirectPayment.getInstallments({
            amount: 118.80,
            maxInstallmentNoInterest: 2,
            brand: bandeira,
            success: function (response) {

              $.each(response.installments, function (i, obj) {
                $.each(obj, function (i2, obj2) {
                  var numberValue = obj2.installmentAmount;
                  var number = "R$ " + numberValue.toFixed(2).replace(".", ",");
                    $('#qtdParcelas') .append("<option value="+ obj2.installmentAmount+ "> "+ obj2.quantity + " parcelas de "+number+ " </option>")
                });
               
              });
            },
            error: function (response) {
              // callback para chamadas que falharam.
            },
            complete: function (response) {
              // Callback para todas chamadas.
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

  // Exibe a quantidade e valores das parcelas

  getParcelas(bandeira: string) {
    console.log('entrei')
    PagSeguroDirectPayment.getInstallments({
      amount: 118.80,
      maxInstallmentNoInterest: 2,
      brand: bandeira,
      success: function (response) {
        console.log(response)
      },
      error: function (response) {
        // callback para chamadas que falharam.
      },
      complete: function (response) {
        // Callback para todas chamadas.
      }
    });
  }
}
