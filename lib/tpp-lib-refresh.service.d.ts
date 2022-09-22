import { HttpEvent, HttpHandler, HttpRequest, HttpClient, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class TppLibRefreshService implements HttpInterceptor {
    private config;
    private _http;
    private refreshTokenInProgress;
    private refreshTokenSubject;
    constructor(config: any, _http: HttpClient);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    addToken(req: HttpRequest<any>): HttpRequest<any>;
    refresh(): Observable<Object>;
    setDataToken(data: any): void;
    expireToken(): any;
    initToken(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TppLibRefreshService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TppLibRefreshService>;
}
//# sourceMappingURL=tpp-lib-refresh.service.d.ts.map