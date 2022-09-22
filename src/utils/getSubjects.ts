import { apiSubjects } from '../service/apiSubjects';

export async function subjectsQuantity(id: string) {
    return apiSubjects
        .get(`alunos/${id}`)
        .then((response) => response.data.numeroDisciplinas)
        .catch((err) => console.log(err));
}
