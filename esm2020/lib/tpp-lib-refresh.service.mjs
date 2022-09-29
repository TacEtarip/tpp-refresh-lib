import { Injectable, Inject } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class TppLibRefreshService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHBwLWxpYi1yZWZyZXNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy90cHAtbGliLXJlZnJlc2gvc3JjL2xpYi90cHAtbGliLXJlZnJlc2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNuRCxPQUFPLEVBQWMsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVyRSxNQUFNLE9BQU8sb0JBQW9CO0lBTS9CLFlBQXNDLE1BQU0sRUFBVSxLQUFpQjtRQUFqQyxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUx2RSxvQkFBb0I7UUFDWiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0Isd0JBQW1CLEdBQXlCLElBQUksZUFBZSxDQUNyRSxJQUFJLENBQ0wsQ0FBQztRQUVBLGtHQUFrRztJQUNwRyxDQUFDO0lBQ0QsU0FBUyxDQUNQLEdBQXFCLEVBQ3JCLElBQWlCO1FBRWpCLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUNELGtCQUFrQjtRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekMsVUFBVSxDQUFDLENBQUMsR0FBc0IsRUFBRSxFQUFFO1lBQ3BDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JB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Q0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztRQUNQLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQzs7d0ZBdEZVLG9CQUFvQixjQU1YLFFBQVE7MEVBTmpCLG9CQUFvQixXQUFwQixvQkFBb0I7dUZBQXBCLG9CQUFvQjtjQURoQyxVQUFVOztzQkFPSSxNQUFNO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgSHR0cENsaWVudCxcbiAgSHR0cEludGVyY2VwdG9yLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHN3aXRjaE1hcCwgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRwcExpYlJlZnJlc2hTZXJ2aWNlIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgLy8gcG9ydF9jcmVkZW5jaWFsZXNcbiAgcHJpdmF0ZSByZWZyZXNoVG9rZW5JblByb2dyZXNzID0gZmFsc2U7XG4gIHByaXZhdGUgcmVmcmVzaFRva2VuU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oXG4gICAgbnVsbFxuICApO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdjb25maWcnKSBwcml2YXRlIGNvbmZpZywgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge1xuICAgIC8vIHRoaXMucG9ydF9jcmVkZW5jaWFsZXM9Y29uZmlnLnVybC8vXCJodHRwczovLzd3bTliazVxc2ouZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2XCJcbiAgfVxuICBpbnRlcmNlcHQoXG4gICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZFRva2VuJyk7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxuICAgIC8vIGNvbnN0IGhlYWRlcnMgPVxuICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLmFkZFRva2VuKHJlcSkpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGU0MDEocmVxLCBuZXh0KTtcbiAgICAgICAgICAvLyByZXR1cm4gdGhpcy5yZWZyZXNoKHJlcSxuZXh0KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgaGFuZGxlNDAxKHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoVG9rZW5JblByb2dyZXNzKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW5TdWJqZWN0LnBpcGUoXG4gICAgICAgIGZpbHRlcigocmVzdWx0KSA9PiByZXN1bHQgIT09IG51bGwpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbmV4dC5oYW5kbGUodGhpcy5hZGRUb2tlbihyZXEpKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlblN1YmplY3QubmV4dChudWxsKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaCgpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgodG9rZW4pID0+IHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb2tlbih0b2tlbik7XG4gICAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW5JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHRoaXMuYWRkVG9rZW4ocmVxKSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRva2VuKHJlcTogSHR0cFJlcXVlc3Q8YW55Pikge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkVG9rZW4nKTtcbiAgICByZXR1cm4gcmVxLmNsb25lKHtcbiAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0b2tlbn1gKSxcbiAgICB9KTtcbiAgfVxuICByZWZyZXNoKCkge1xuICAgIGxldCByZWZyZXNoVG9rZW4gPSB7IHJlZnJlc2hUb2tlbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlZnJlc2hUb2tlbicpIH07XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuY29uZmlnLnVybCArICcvb2F1dGgvcmVmcmVzaCcsIHJlZnJlc2hUb2tlbik7XG4gIH1cblxuICBzZXREYXRhVG9rZW4oZGF0YSkge1xuICAgIGxldCByZXNwID0gZGF0YTtcbiAgICBsZXQgdXN1YXJpb19pbmljaW86IGFueSA9IHJlc3A7XG4gICAgbGV0IHRva2VuRGF0YTogYW55ID0gdXN1YXJpb19pbmljaW8udG9rZW5EYXRhO1xuICAgIC8vIHRva2VuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgdG9rZW5EYXRhLmFjY2Vzc1Rva2VuKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZXhwaXJlc0luJywgdG9rZW5EYXRhLmV4cGlyZXNJbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuVHlwZScsIHRva2VuRGF0YS50b2tlblR5cGUpO1xuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicmVmcmVzaFRva2VuXCIsdG9rZW5EYXRhLnJlZnJlc2hUb2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkVG9rZW4nLCB0b2tlbkRhdGEuaWRUb2tlbik7XG4gICAgLy8gZGVjb2RlIGlkVG9rZW5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmluaXNoVG9rZW4nLCB0aGlzLmV4cGlyZVRva2VuKCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbml0VG9rZW4nLCB0aGlzLmluaXRUb2tlbigpKTtcbiAgfVxuICBleHBpcmVUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZFRva2VuJyk7XG4gICAgbGV0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgbGV0IGRlY29kZWRWYWx1ZSA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IoYmFzZTY0VXJsKSk7XG4gICAgcmV0dXJuIGRlY29kZWRWYWx1ZS5leHA7XG4gIH1cbiAgaW5pdFRva2VuKCkge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkVG9rZW4nKTtcbiAgICBsZXQgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICBsZXQgZGVjb2RlZFZhbHVlID0gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYihiYXNlNjRVcmwpKTtcbiAgICByZXR1cm4gZGVjb2RlZFZhbHVlLmlhdDtcbiAgfVxufVxuIl19