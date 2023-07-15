export interface IOrder {
    pedido:{
       desconto: string,
       observacoes: string,
       observacaointerna: string,
       data: string,
       numero: string,
       numeroPedidoLoja: string,
       vendedor: string,
       valorfrete: string,
       totalprodutos: string,
       totalvenda: string,
       situacao: string,
       loja: string,
       dataPrevista: string,
       tipoIntegracao: string,
       cliente: IOrderClient,
       itens: IOrderItem[],
       parcelas: IOrderPortion[],
       nota: IOrderInvoice,
       transporte: IOrderDeliveryAddress
    }
}

export interface IOrderItem {
    item: IOrderItemData
 }

 export interface IOrderItemData {
   codigo: string,
   descricao: string,
   quantidade: string,
   valorunidade: string,
   precocusto: string,
   descontoItem: string,
   un: string,
   pesoBruto: string,
   largura: string,
   altura: string,
   profundidade: string,
   unidadeMedida: string,
   descricaoDetalhada: string
}

 export interface IOrderClient {
    nome: string,
    cnpj: string,
    ie: string,
    rg: string,
    endereco: string,
    numero: string,
    complemento: string,
    cidade: string,
    bairro: string,
    cep: string,
    uf: string,
    email: string,
    celular: string,
    fone: string
 }

 export interface IOrderPortion {
    parcela:{
       idLancamento: string,
       valor: string,
       dataVencimento: string,
       obs: string,
       destino: string,
       forma_pagamento:{
          id: string,
          descricao: string,
          codigoFiscal: string
       }
    }
 }

export interface IOrderInvoice {
    serie: string,
    numero: string,
    dataEmissao: string,
    situacao: string,
    chaveAcesso: string,
    valorNota: string
}

export interface IOrderShipping {
    numero: string,
    dataCriacao: string
}

export interface IOrderDimension {
    peso: string,
    altura: string,
    largura: string,
    comprimento: string,
    diametro: string
}

export interface IOrderVolume {
    volume:{
       id: string,
       idServico: string,
       servico: string,
       codigoServico: string,
       codigoRastreamento: string,
       dataSaida: string,
       prazoEntregaPrevisto: string,
       valorFretePrevisto: string,
       valorDeclarado: string,
       remessa: IOrderShipping,
       dimensoes: IOrderDimension,
       urlRastreamento: string
    }
}

export interface IOrderDeliveryAddress {
    transportadora: string,
    cnpj: string,
    tipo_frete: string,
    volumes: IOrderVolume[],
    enderecoEntrega:{
       nome: string,
       endereco: string,
       numero: string,
       complemento: string,
       cidade: string,
       bairro: string,
       cep: string,
       uf: string
    }
}