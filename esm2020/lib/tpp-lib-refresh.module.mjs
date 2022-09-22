import { NgModule } from '@angular/core';
import { TppLibRefreshComponent } from './tpp-lib-refresh.component';
import { TppLibRefreshService } from './tpp-lib-refresh.service';
import * as i0 from "@angular/core";
export class TppLibRefreshModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHBwLWxpYi1yZWZyZXNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3RwcC1saWItcmVmcmVzaC9zcmMvbGliL3RwcC1saWItcmVmcmVzaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBT2pFLE1BQU0sT0FBTyxtQkFBbUI7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1FBQzFCLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCxvQkFBb0I7Z0JBQ3BCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2FBQ3hDO1NBQ0YsQ0FBQztJQUNKLENBQUM7O3NGQVRVLG1CQUFtQjtxRUFBbkIsbUJBQW1CO3lFQUhyQixFQUFFO3VGQUdBLG1CQUFtQjtjQUwvQixRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7Z0JBQ3RDLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ2xDOzt3RkFDWSxtQkFBbUIsbUJBSmYsc0JBQXNCLGFBRTNCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcHBMaWJSZWZyZXNoQ29tcG9uZW50IH0gZnJvbSAnLi90cHAtbGliLXJlZnJlc2guY29tcG9uZW50JztcbmltcG9ydCB7IFRwcExpYlJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi90cHAtbGliLXJlZnJlc2guc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1RwcExpYlJlZnJlc2hDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXSxcbiAgZXhwb3J0czogW1RwcExpYlJlZnJlc2hDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBUcHBMaWJSZWZyZXNoTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VHBwTGliUmVmcmVzaE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVHBwTGliUmVmcmVzaE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUcHBMaWJSZWZyZXNoU2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=