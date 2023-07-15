import { environment } from "src/environments/environment";

export const BLING_BASE_URL = environment.production 
    ? 'https://bling.com.br/'
    : '/bling_api';

const BLING_PRODUTOS_URL = `${BLING_BASE_URL}Api/v2/produtos/`;
const BLING_PEDIDOS_URL = `${BLING_BASE_URL}Api/v2/pedidos/`;
const BLING_SITUACAO_URL = `${BLING_BASE_URL}Api/v2/situacao/`

export const blingUrls = {
    products: {
        getProductPageJson: (page: number) => `${BLING_PRODUTOS_URL}page=${page}/json/`
    },
    order: {
        getOrderPageJson: (page: number) => `${BLING_PEDIDOS_URL}page=${page}/json`
    },
    situation: {
        getSituations: (module: string) => `${BLING_SITUACAO_URL}/${module}/json`
    }
}