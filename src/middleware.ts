import { defineMiddleware } from 'astro:middleware';


const privateRoutes = ['/protected'];
const publicRoutes = ['/'];

export const onRequest = defineMiddleware(async (context, next) => {

    const pathName = context.url.pathname;
    const authHeaders = context.request.headers.get('Authorization');
    

    if (authHeaders) {
        return next();
    }

    if (privateRoutes.includes(context.url.pathname)) {
        return new Response('Auth Required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            }
        });
    }
    // console.log("🚀 ~ onRequest ~ context:", context)

    //     console.log('onRequest middleware');

    // return new Response(JSON.stringify({ hola: 'mundo' }), {
    // });

    return next();
}); 