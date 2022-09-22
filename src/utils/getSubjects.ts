import { apiSubjects } from '../service/apiSubjects';

export async function subjectsQuantity(id: string) {
    const response = await apiSubjects.get(`alunos/${id}`);

    return response.data.numeroDisciplinas;
}
