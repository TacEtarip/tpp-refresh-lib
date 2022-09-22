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
        console.log('xx', localStorage.getItem('idToken'));
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
        console.log('data de token' + data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHBwLWxpYi1yZWZyZXNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy90cHAtbGliLXJlZnJlc2gvc3JjL2xpYi90cHAtbGliLXJlZnJlc2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNuRCxPQUFPLEVBQWMsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVyRSxNQUFNLE9BQU8sb0JBQW9CO0lBTS9CLFlBQXNDLE1BQU0sRUFBVSxLQUFpQjtRQUFqQyxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUx2RSxvQkFBb0I7UUFDWiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0Isd0JBQW1CLEdBQXlCLElBQUksZUFBZSxDQUNyRSxJQUFJLENBQ0wsQ0FBQztRQUVBLGtHQUFrRztJQUNwRyxDQUFDO0lBQ0QsU0FBUyxDQUNQLEdBQXFCLEVBQ3JCLElBQWlCO1FBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekI7UUFDRCxrQkFBa0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pD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Q0FBQztRQUN4RCxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsV0FBVztRQUNULE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7UUFDUCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDO0lBQzFCLENBQUM7O3dGQXhGVSxvQkFBb0IsY0FNWCxRQUFROzBFQU5qQixvQkFBb0IsV0FBcEIsb0JBQW9CO3VGQUFwQixvQkFBb0I7Y0FEaEMsVUFBVTs7c0JBT0ksTUFBTTt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwRXZlbnQsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBDbGllbnQsXG4gIEh0dHBJbnRlcmNlcHRvcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzd2l0Y2hNYXAsIGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcHBMaWJSZWZyZXNoU2VydmljZSBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIC8vIHBvcnRfY3JlZGVuY2lhbGVzXG4gIHByaXZhdGUgcmVmcmVzaFRva2VuSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICBwcml2YXRlIHJlZnJlc2hUb2tlblN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFxuICAgIG51bGxcbiAgKTtcbiAgY29uc3RydWN0b3IoQEluamVjdCgnY29uZmlnJykgcHJpdmF0ZSBjb25maWcsIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAvLyB0aGlzLnBvcnRfY3JlZGVuY2lhbGVzPWNvbmZpZy51cmwvL1wiaHR0cHM6Ly83d205Yms1cXNqLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2RldlwiXG4gIH1cbiAgaW50ZXJjZXB0KFxuICAgIHJlcTogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc29sZS5sb2coJ3h4JywgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkVG9rZW4nKSk7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRUb2tlbicpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH1cbiAgICAvLyBjb25zdCBoZWFkZXJzID1cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUodGhpcy5hZGRUb2tlbihyZXEpKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlNDAxKHJlcSwgbmV4dCk7XG4gICAgICAgICAgLy8gcmV0dXJuIHRoaXMucmVmcmVzaChyZXEsbmV4dClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG4gIGhhbmRsZTQwMShyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKSB7XG4gICAgaWYgKHRoaXMucmVmcmVzaFRva2VuSW5Qcm9ncmVzcykge1xuICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuU3ViamVjdC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHJlc3VsdCkgPT4gcmVzdWx0ICE9PSBudWxsKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG5leHQuaGFuZGxlKHRoaXMuYWRkVG9rZW4ocmVxKSkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlbkluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgdGhpcy5yZWZyZXNoVG9rZW5TdWJqZWN0Lm5leHQobnVsbCk7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHRva2VuKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9rZW4odG9rZW4pO1xuICAgICAgICAgIHRoaXMucmVmcmVzaFRva2VuSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLmFkZFRva2VuKHJlcSkpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb2tlbihyZXE6IEh0dHBSZXF1ZXN0PGFueT4pIHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZFRva2VuJyk7XG4gICAgcmV0dXJuIHJlcS5jbG9uZSh7XG4gICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dG9rZW59YCksXG4gICAgfSk7XG4gIH1cbiAgcmVmcmVzaCgpIHtcbiAgICBsZXQgcmVmcmVzaFRva2VuID0geyByZWZyZXNoVG9rZW46IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZWZyZXNoVG9rZW4nKSB9O1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmNvbmZpZy51cmwgKyAnL29hdXRoL3JlZnJlc2gnLCByZWZyZXNoVG9rZW4pO1xuICB9XG5cbiAgc2V0RGF0YVRva2VuKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZygnZGF0YSBkZSB0b2tlbicgKyBkYXRhKTtcbiAgICBsZXQgcmVzcCA9IGRhdGE7XG4gICAgbGV0IHVzdWFyaW9faW5pY2lvOiBhbnkgPSByZXNwO1xuICAgIGxldCB0b2tlbkRhdGE6IGFueSA9IHVzdWFyaW9faW5pY2lvLnRva2VuRGF0YTtcbiAgICAvLyB0b2tlblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIHRva2VuRGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2V4cGlyZXNJbicsIHRva2VuRGF0YS5leHBpcmVzSW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlblR5cGUnLCB0b2tlbkRhdGEudG9rZW5UeXBlKTtcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInJlZnJlc2hUb2tlblwiLHRva2VuRGF0YS5yZWZyZXNoVG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZFRva2VuJywgdG9rZW5EYXRhLmlkVG9rZW4pO1xuICAgIC8vIGRlY29kZSBpZFRva2VuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZpbmlzaFRva2VuJywgdGhpcy5leHBpcmVUb2tlbigpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5pdFRva2VuJywgdGhpcy5pbml0VG9rZW4oKSk7XG4gIH1cbiAgZXhwaXJlVG9rZW4oKSB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRUb2tlbicpO1xuICAgIGxldCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgIGxldCBkZWNvZGVkVmFsdWUgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKGJhc2U2NFVybCkpO1xuICAgIHJldHVybiBkZWNvZGVkVmFsdWUuZXhwO1xuICB9XG4gIGluaXRUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZFRva2VuJyk7XG4gICAgbGV0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgbGV0IGRlY29kZWRWYWx1ZSA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IoYmFzZTY0VXJsKSk7XG4gICAgcmV0dXJuIGRlY29kZWRWYWx1ZS5pYXQ7XG4gIH1cbn1cbiJdfQ==