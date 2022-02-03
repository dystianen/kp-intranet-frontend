import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboards/sales' },

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards/sales' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'dashboards', loadChildren: () => import('app/modules/admin/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'supplier', loadChildren: () => import('app/modules/admin/supplier/supplier.module').then(m => m.SupplierModule) },
            { path: 'site', loadChildren: () => import('app/modules/admin/site/site.module').then(m => m.SiteModule) },
            { path: 'product', loadChildren: () => import('app/modules/admin/product/product.module').then(m => m.ProductModule) },
            { path: 'product-category', loadChildren: () => import('app/modules/admin/product/category/category.module').then(m => m.CategoryModule) },
            { path: 'product-attribute', loadChildren: () => import('app/modules/admin/product/attribute/attribute.module').then(m => m.AttributeModule) },

            { path: 'user', loadChildren: () => import('app/modules/admin/user/user.module').then(m => m.UserModule) },
            { path: 'courier', loadChildren: () => import('app/modules/admin/courier/courier.module').then(m => m.CourierModule) },
            { path: 'role', loadChildren: () => import('app/modules/admin/role/role.module').then(m => m.RoleModule) },
            { path: 'menu', loadChildren: () => import('app/modules/admin/menu/menu.module').then(m => m.MenuModule) },
            { path: 'history/input-stock', loadChildren: () => import('app/modules/admin/history/input-stock/input-stock.module').then(m => m.InputStockModule) },
        ]
    }
];
