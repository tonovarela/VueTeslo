import type { RouteRecordRaw } from "vue-router";
import isAdminGuard from "../guards/is-admin.guard";


export const adminRoutes: RouteRecordRaw = {
    path: "/admin",
    name: "admin",
    redirect: { name: "dashboard" },
    beforeEnter: [isAdminGuard],
    component: () => import("@/modules/admin/layouts/AdminLayout.vue"),
    children: [
        {
            path: "dashboard",
            name: "dashboard",
            component: () => import("@/modules/admin/pages/DashboardPage.vue"),
        },
        {
            path: 'product/:productId',
            name: 'admin-product',
            component: () => import("@/modules/admin/pages/ProductPage.vue"),
        },
        {
            path: "products",
            name: "products",
            component: () => import("@/modules/admin/pages/ProductsPage.vue"),
        }

    ]
}