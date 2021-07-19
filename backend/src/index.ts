import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from "./constants";
import { MyContext } from "./types";


const port = 4000;

const main = async () => {

    const orm = await MikroORM.init(mikroConfig);
    orm.getMigrator().up();

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient({
        host: 'redis-13962.c247.eu-west-1-1.ec2.cloud.redislabs.com',
        port: 13962,
        password: 'yA7jCNyzosVp8PC3v2TPFrEuGbMZ6bFx'
    });

    redisClient.on('error', (error) => console.error('RedisClient Error: ' + error));

    const app = express();

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                httpOnly: true,
                sameSite: 'lax',
                secure: __prod__
            },
            saveUninitialized: false,
            secret: 'qn3wgV3IUu7U8emOAdseGzwNju5R3pTD',
            resave: false
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver,
                PostResolver,
                UserResolver
            ],
            validate: false
        }),
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(port, () => {
        console.log('=== FRGTT Server on port', port, '===');
    });


}

main().catch((error) => console.error(error));
