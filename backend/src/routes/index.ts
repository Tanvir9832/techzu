import { Application } from 'express';
import routes from './routes';

export function applicationRoutes(app: Application) {
    for (const uri in routes) {
        if (Object.prototype.hasOwnProperty.call(routes, uri)) {
            app.use(uri, routes[uri as keyof typeof routes]);
        }
    }
}
