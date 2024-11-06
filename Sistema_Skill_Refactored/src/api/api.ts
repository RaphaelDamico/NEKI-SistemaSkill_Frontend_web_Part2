import axios from "axios";
import { toast } from 'react-toastify';
import { IUserCredentials, Page, Skill, SkillModel, UpdateUserSkill, UpdateUserSkillLevelResponse, UserSkill, UserSkillRequest, UserSkillResponse } from "../interfaces";

const api = axios.create({
    baseURL: "http://localhost:8080/"
});

const handleRegisterError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            toast.error("Este nome de usuário já existe");
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return;
        } else if (error.request) {
            toast.error("Nenhuma resposta recebida do servidor.");
            console.log(error.request);
        } else {
            toast.error(`Erro ao configurar a requisição: ${error.message}`);
            console.log('Error', error.message);
        }
    } else {
        toast.error(`Erro desconhecido: ${error}`);
        console.log('Error', error);
    }
};

const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
            throw new Error("Usuário ou senha inválidos");
        }
        console.error("Erro de Login", error.message);
        throw new Error("Login falhou");
    } else {
        console.error("Erro desconhecido", error);
        throw new Error("Erro desconhecido");
    }
};

export const signupUser = async (payload: IUserCredentials): Promise<void> => {
    const {
        username,
        password
    } = payload
    try {
        const response = await api.post(`users/signup`, {
            "username": username,
            "password": password
        });
        if (response.status === 201)
            toast.success("Usuário registrado com sucesso");
        else {
            toast.error("Erro ao registrar usuário, tente novamente.")
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409)
            throw new Error("Este nome de usuário já existe");
        else {
            handleRegisterError(error);
            throw new Error("Erro desconhecido ao registrar usuário");
        }
    }
};

export const signinUser = async (payload: IUserCredentials): Promise<void> => {
    const {
        username,
        password
    } = payload
    try {
        const response = await api.post(`auth/signin`, {
            "username": username,
            "password": password
        });
        const token = response.data.token;
        const userId = response.data.id;
        if (!token)
            throw new Error("Token não encontrado na resposta");
        if (!userId)
            throw new Error("User ID não encontrado na resposta");
        await localStorage.setItem("userToken", JSON.stringify(token));
        await localStorage.setItem("userId", JSON.stringify(userId));
        toast.success("Login realizado com sucesso");
    } catch (error: unknown) {
        handleAuthError(error);
    }
};

export const addSkillToUser = async (payload: UserSkillRequest[]): Promise<Skill[] | null> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.post<Skill[]>("skills/add-existing", payload, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar skill ao usuário: ", error);
        return null;
    }
};

export const getAllSkills = async (
    page: number = 0,
    size: number = 10,
    sort: string = "skillName,asc",
    skillNameFilter: string = ""
): Promise<Page<SkillModel> | null> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.get<Page<SkillModel>>("skills", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'accept': '*/*'
            },
            params: {
                page: page,
                size: size,
                sort: sort,
                skillNameFilter: skillNameFilter
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar skills:", error);
        return null;
    }
};


export const getUserSkills = async (
    page: number = 0,
    size: number = 10,
    sort: string = "skillName,asc",
    userSkillNameFilter: string = ""
): Promise<Page<UserSkill> | null> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.get<Page<UserSkill>>(`user-skills`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`,
                'accept': '*/*'
            },
            params: {
                page: page,
                size: size,
                sort: sort,
                userSkillNameFilter: userSkillNameFilter
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar skills do usuário:", error);
        return null;
    }
};

export const updateUserSkillLevel = async ({ userSkillId, level }: UpdateUserSkill): Promise<UpdateUserSkillLevelResponse> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) throw new Error("Token não encontrado");

        await api.put(`user-skills/level`,
            { userSkillId, level },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }
        );
        return {
            success: true,
            message: "Nível da habilidade atualizado com sucesso!",
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Erro ao atualizar nível da skill com o id ${userSkillId}:`, error.message);
            return {
                success: false,
                message: `Erro: ${error.response?.data || error.message}`
            };
        } else {
            console.error("Erro desconhecido:", error);
            return {
                success: false,
                message: "Erro desconhecido ao atualizar o nível da habilidade.",
            };
        }
    }
};

export const deleteUserSkill = async (skillId: string): Promise<void> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }

        await api.delete(`user-skills/${skillId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
    } catch (error) {
        console.error(`Erro ao deletar skill com o id ${skillId}:`, error);
    }
};
