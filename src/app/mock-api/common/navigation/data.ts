/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        subtitle: 'All dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.sales',
                title: 'Sales',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/dashboards/sales'
            },
            {
                id: 'dashboards.payment',
                title: 'Payments',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboards/payments'
            },
            {
                id: 'dashboards.shipping',
                title: 'Shipping',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboards/shipping'
            }
        ]
    },
    {
        id: 'ecommerce',
        title: 'Ecommerce',
        subtitle: 'Manage Product, Order',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'apps.ecommerce',
                title: 'Products',
                type: 'collapsable',
                icon: 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id: 'apps.ecommerce.product',
                        title: 'Product',
                        type: 'basic',
                        link: '/apps/ecommerce/product'
                    },
                    {
                        id: 'apps.ecommerce.category',
                        title: 'Category',
                        type: 'basic',
                        link: '/apps/ecommerce/category'
                    },
                    {
                        id: 'apps.ecommerce.category',
                        title: 'Attribute',
                        type: 'basic',
                        link: '/apps/ecommerce/atteibute'
                    }
                ]
            },
            {
                id: 'apps.orders',
                title: 'Orders',
                type: 'basic',
                icon: 'heroicons_outline:cloud',
                link: '/apps/orders'
            },
            {
                id: 'apps.supplier',
                title: 'Suppliers',
                type: 'basic',
                icon: 'heroicons_outline:cloud',
                link: '/apps/suppliers'
            }
        ]
    },
    {
        id: 'reports',
        title: 'reports',
        subtitle: 'Reports',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'reports.sales',
                title: 'Sales',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/reports/sales'
            },
            {
                id: 'reports.purchase',
                title: 'Purchase',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/reports/purchase'
            },
        ]
    },
    // {
    //     id: 'divider-1',
    //     type: 'divider'
    // },
    {
        id: 'internal',
        title: 'Internal',
        subtitle: 'User, Courier, Site, Store',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'internal.User',
                title: 'Users',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/internal/users'
            },
            {
                id: 'internal.courier',
                title: 'Courier',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/internal/courier'
            },
            {
                id: 'internal.sites',
                title: 'Sites',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/internal/sites'
            },
            {
                id: 'internal.shippers',
                title: 'Shippers',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/internal/shippers'
            },
        ]
    },
    {
        id: 'customer',
        title: 'Customer',
        subtitle: 'All about customers',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'customer.members',
                title: 'Members',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/customer/members'
            },
            {
                id: 'customer.roles',
                title: 'Roles',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/customer/roles'
            },
        ]
    },
    {
        id: 'permission',
        title: 'Permissions',
        subtitle: 'Menu, Role',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'permission.menu',
                title: 'Menu',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/permission/users'
            },
            {
                id: 'permission.roles',
                title: 'Roles',
                type: 'basic',
                icon: 'heroicons_outline:menu-alt-2',
                link: '/permission/roles'
            },
        ]
    }
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
