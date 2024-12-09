import { getPostByIdFromDB } from '../models/postModel';

export const getPostById = async (id: number)=> {
    const post = await getPostByIdFromDB(id);
    return post;
};
