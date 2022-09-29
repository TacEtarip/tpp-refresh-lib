import * as i0 from '@angular/core';
import { Injectable, Inject, Component, NgModule } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import * as i1 from '@angular/common/http';

class TppLibRefreshService {
    constructor(config, _http) {
        this.config = config;
        this._http = _http;
        // port_credenciales
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject = new BehaviorSubject(null);
        // this.port_credenciales=config.url//"https://7wm9bk5qsj.execute-api.us-east-1.amazonaws.com/dev"
    }
    intercept(req, next) {
        const token = localStorage.getItem('idToken');
        if (!token) {
            return next.handle(req);
        }
        // const headers =
        return next.handle(this.addToken(req)).pipe(catchError((err) => {
            if (err.status === 401) {
                return this.handle401(req, next);
                // return this.refresh(req,next)
            }
            return throwError(err);
        }));
    }
    handle401(req, next) {
        if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(filter((result) => result !== null), take(1), switchMap(() => next.handle(this.addToken(req))));
        }
        else {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            return this.refresh().pipe(switchMap((token) => {
                this.setDataToken(token);
                this.refreshTokenInProgress = false;
                return next.handle(this.addToken(req));
            }));
        }
    }
    addToken(req) {
        const token = localStorage.getItem('idToken');
        return req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
    }
    refresh() {
        let refreshToken = { refreshToken: localStorage.getItem('refreshToken') };
        return this._http.post(this.config.url + '/oauth/refresh', refreshToken);
    }
    setDataToken(data) {
        let resp = data;
        let usuario_inicio = resp;
        let tokenData = usuario_inicio.tokenData;
        // token
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('expiresIn', tokenData.expiresIn);
        localStorage.setItem('tokenType', tokenData.tokenType);
        // localStorage.setItem("refreshToken",tokenData.refreshToken);
        localStorage.setItem('idToken', tokenData.idToken);
        // decode idToken
        localStorage.setItem('finishToken', this.expireToken());
        localStorage.setItem('initToken', this.initToken());
    }
    expireToken() {
        const token = localStorage.getItem('idToken');
        let base64Url = token.split('.')[1];
        let decodedValue = JSON.parse(window.atob(base64Url));
        return decodedValue.exp;
    }
    initToken() {
        const token = localStorage.getItem('idToken');
        let base64Url = token.split('.')[1];
        let decodedValue = JSON.parse(window.atob(base64Url));
        return decodedValue.iat;
    }
}
TppLibRefreshService.ɵfac = function TppLibRefreshService_Factory(t) { return new (t || TppLibRefreshService)(i0.ɵɵinject('config'), i0.ɵɵinject(i1.HttpClient)); };
TppLibRefreshService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TppLibRefreshService, factory: TppLibRefreshService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TppLibRefreshService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['config']
            }] }, { type: i1.HttpClient }]; }, null); })();

class TppLibRefreshComponent {
    constructor() { }
    ngOnInit() { }
}
TppLibRefreshComponent.ɵfac = function TppLibRefreshComponent_Factory(t) { return new (t || TppLibRefreshComponent)(); };
TppLibRefreshComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TppLibRefreshComponent, selectors: [["lib-tpp-lib-refresh"]], decls: 2, vars: 0, template: function TppLibRefreshComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "p");
        i0.ɵɵtext(1, "tpp-lib-refresh works!");
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TppLibRefreshComponent, [{
        type: Component,
        args: [{
                selector: 'lib-tpp-lib-refresh',
                template: ` <p>tpp-lib-refresh works!</p> `,
                styles: [],
            }]
    }], function () { return []; }, null); })();

class TppLibRefreshModule {
    static forRoot(config) {
        return {
            ngModule: TppLibRefreshModule,
            providers: [
                TppLibRefreshService,
                { provide: 'config', useValue: config },
            ],
        };
    }
}
TppLibRefreshModule.ɵfac = function TppLibRefreshModule_Factory(t) { return new (t || TppLibRefreshModule)(); };
TppLibRefreshModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TppLibRefreshModule });
TppLibRefreshModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TppLibRefreshModule, [{
        type: NgModule,
        args: [{
                declarations: [TppLibRefreshComponent],
                imports: [],
                exports: [TppLibRefreshComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TppLibRefreshModule, { declarations: [TppLibRefreshComponent], exports: [TppLibRefreshComponent] }); })();

/*
 * Public API Surface of tpp-lib-refresh
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TppLibRefreshComponent, TppLibRefreshModule, TppLibRefreshService };
//# sourceMappingURL=tpp-lib-refresh.mjs.map
