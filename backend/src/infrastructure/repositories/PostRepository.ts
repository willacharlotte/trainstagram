import Post, {PostAttributes} from "../../domain/post";
import { IRepository } from "./IRepository";
import {Op} from "sequelize";

export class PostRepository implements IRepository<PostAttributes, undefined,number> {

    public PostRepository() {}

    async create(body: PostAttributes): Promise<PostAttributes> {
        console.log(body.userID);
        
        return await Post.create({
            postID: body.postID,
            userID: body.userID,
            Image: body.Image,
            Likes: 0,
            Caption: body.Caption,
            PostedAt: body.PostedAt,
        });
    }
    
    async readByID(id: number): Promise<PostAttributes | undefined> {
        console.log(id);
        const result = await Post.findByPk(id);
        return result?.dataValues;
    }

        
    readByOne(body: undefined): Promise<undefined | undefined> {
        throw new Error("Method not implemented.");
    }

    async readAll(id: number): Promise<PostAttributes[] | undefined> {
        return await Post.findAll({
            where: {
                userID: {
                    [Op.ne]: id,
                }
            }
        });;
        
    }

    async readAllUser(id: number): Promise<PostAttributes[] | undefined> {
        return await Post.findAll({
            where: {
                userID: id
            }
        });;
    }
    
    async update(id: number, body: PostAttributes): Promise<PostAttributes | null> {
        await Post.update({
            Caption: body.Caption,
            Likes: body.Likes,
            PostedAt: body.PostedAt,
        }, { where: { postID: id } });

        const post = await Post.findByPk(id);

        return post;
    }

    async delete(id: number): Promise<boolean> {
        let post = await Post.findByPk(id);
        post?.destroy();
        return true;
    }

}