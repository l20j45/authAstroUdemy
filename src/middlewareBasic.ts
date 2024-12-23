import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';


const privateRoutes = ['/protected'];
const publicRoutes = ['/'];

export const onRequest = defineMiddleware(async (context, next) => {

    const pathName = context.url.pathname;
    const authHeaders = context.request.headers.get('Authorization') ?? '';




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
        const authValue = authHeaders.split(' ')[1] ?? 'user:pass';
        const decodedValue = atob(authValue);
        const [username, password] = decodedValue.split(':');
        if (username === 'admin' && password === 'admin') {
            return next();
        }
        else {
            console.log("no permitido")
        }
    }
    return new Response('Auth Required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        }
    });

};