import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
    @Field()
    username!: string;
    @Field()
    password!: string;
}

@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async register(
        @Arg('options') {username, password}: UsernamePasswordInput,
        @Ctx() {em}: MyContext
    ) {
        const hashedPassword = await argon2.hash(password);
        const user = em.create(User, {username, password: hashedPassword});
        await em.persistAndFlush(user);
        return user;
    }

    @Mutation(() => User)
    async login(
        @Arg('options') {username, password}: UsernamePasswordInput,
        @Ctx() {em}: MyContext
    ) {
        const user = await em.findOne(User, {username});
        if (!user) {
            return {
                errors: [{name}]
            }
        }   
        const hashedPassword = await argon2.hash(password);
        return user;
    }

}
