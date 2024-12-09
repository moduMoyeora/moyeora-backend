import { getPostByIdFromDB } from '../models/postModel';

export const getPostById = async (id: number)=> {
    return await getPostByIdFromDB(id);
};
