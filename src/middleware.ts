import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';


const privateRoutes = ['/protected'];
const publicRoutes = ['/'];

export const onRequest = defineMiddleware(async (context, next) => {

    const pathName = context.url.pathname;
    const authHeaders = '';




    if (privateRoutes.includes(context.url.pathname)) {
        return checkLocalAuth(authHeaders, next);
    }
    console.log("🚀 ~ onRequest ~ authHeaders:", authHeaders)
    // console.log("🚀 ~ onRequest ~ context:", context)

    //     console.log('onRequest middleware');

    // return new Response(JSON.stringify({ hola: 'mundo' }), {
    // });

    return next();
});


const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {

    if (authHeaders) {
        
    }
    return new Response('Auth Required', {
        status: 401,

    });

};