import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthorizedGuard } from './core/auth/guards/authorized.guard';

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
            { path: 'example', canActivate: [AuthorizedGuard], loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
            { path: 'dashboards', canActivate: [AuthorizedGuard], loadChildren: () => import('app/modules/admin/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'user', canActivate: [AuthorizedGuard], loadChildren: () => import('app/modules/admin/user/user.module').then(m => m.UserModule) },
            { path: 'role', canActivate: [AuthorizedGuard], loadChildren: () => import('app/modules/admin/role/role.module').then(m => m.RoleModule) },
            { path: 'menu', canActivate: [AuthorizedGuard], loadChildren: () => import('app/modules/admin/menu/menu.module').then(m => m.MenuModule) },
            { path: 'utilities/zoom/bull-worker', canActivate: [AuthorizedGuard], loadChildren: () => import('app/modules/admin/utilities/zoom/bull-worker/bull-worker.module').then(m => m.BullWorkerModule) },
            { path: 'sbmptn/module', canActivate: [AuthorizedGuard], loadChildren: () => import('app/modules/admin/sbmptn/module/module.module').then(m => m.ModuleModule) },
        ]
    }
];
