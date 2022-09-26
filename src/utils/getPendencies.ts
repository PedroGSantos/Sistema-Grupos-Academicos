import { apiPendencies } from '../service/apiPendencies';

export async function libraryPendenciesQuantity(cpf: string) {
    return apiPendencies
        .get(`api/usuario/${cpf}/pendenciasalunos/`)
        .then((response) => response.data.data)
        .catch(() => 0);
}
