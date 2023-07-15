export interface IProduct {
    produto: {
        codigo: string,
        tipo: string,
        descricao: string,
        unidade: string,
        preco: string,
        precoCusto: string,
        pesoLiq: string,
        pesoBruto: string,
        estoqueMinimo: string,
        estoqueMaximo: string,
        gtin: string,
        gtinEmbalagem: string,
        descricaoCurta: string,
        descricaoComplementar: string,
        larguraProduto: string,
        alturaProduto: string,
        profundidadeProduto: string,
        unidadeMedida: string,
        dataInclusao: string,
        dataAlteracao: string,
        imageThumbnail: string,
        nomeFornecedor: string,
        marca: string,
        class_fiscal: string,
        cest: string,
        origem: string,
        idGrupoProduto: string,
        linkExterno: string,
        observacoes: string,
        grupoProduto: string,
        itensPorCaixa: string,
        volumes: string,
        urlVideo: string,
        localizacao: string,
        crossdocking: string,
        garantia: string,
        condicao: string,
        freteGratis: string,
        producao: string,
        dataValidade: string,
        quantidade?: string,
        estrutura?: IProductSharedStockStructure[]
        descricaoFornecedor: string,
        imagem: [
            {
                link: string,
                validade: string,
                tipoArmazenamento: string
            }
        ],
        produtoLoja: {
            preco: {
                preco: string,
                precoPromocional: string
            },
            categoria: [
                {
                    id: string,
                    descricao: string,
                    idCategoriaPai: string
                }
            ]
        },
        codigopai: string,
        estoqueAtual: number,
        depositos: [
            {
                deposito: {
                    id: string,
                    nome: string,
                    saldo: string
                }
            }
        ]
    }
}

 
export interface IProductSharedStockStructure {
    componente: {
        codigo: string,
        nome: string,
        quantidade: string
    }
}