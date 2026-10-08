import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Layouts
import AppLayout from '../layouts/AppLayout.vue'

// Auth
import LoginView from '../views/auth/LoginView.vue'

// Dashboard
import DashboardView from '../views/DashboardView.vue'

// Master Data
import ProductsView from '../views/master/ProductsView.vue'
import MaterialsView from '../views/master/MaterialsView.vue'
import CategoriesView from '../views/master/CategoriesView.vue'
import UnitsView from '../views/master/UnitsView.vue'
import SuppliersView from '../views/master/SuppliersView.vue'
import CustomersView from '../views/master/CustomersView.vue'
import WarehousesView from '../views/master/WarehousesView.vue'
import BomView from '../views/master/BomView.vue'
import BomCreateView from '../views/master/BomCreateView.vue'

// Purchasing
import PurchaseRequestsView from '../views/purchasing/PurchaseRequestsView.vue'
import PurchaseRequestCreateView from '../views/purchasing/PurchaseRequestCreateView.vue'
import PurchaseRequestDetailView from '../views/purchasing/PurchaseRequestDetailView.vue'
import PurchaseOrdersView from '../views/purchasing/PurchaseOrdersView.vue'
import PurchaseOrderDetailView from '../views/purchasing/PurchaseOrderDetailView.vue'
import GoodsReceiptView from '../views/purchasing/GoodsReceiptView.vue'

// Inventory
import StockView from '../views/inventory/StockView.vue'
import StockMovementView from '../views/inventory/StockMovementView.vue'
import StockTransferView from '../views/inventory/StockTransferView.vue'
import StockTransferCreateView from '../views/inventory/StockTransferCreateView.vue'
import StockOpnameView from '../views/inventory/StockOpnameView.vue'
import StockOpnameDetailView from '../views/inventory/StockOpnameDetailView.vue'

// Production
import ProductionPlanningView from '../views/production/ProductionPlanningView.vue'
import ProductionOrdersView from '../views/production/ProductionOrdersView.vue'
import ProductionOrderCreateView from '../views/production/ProductionOrderCreateView.vue'
import ProductionOrderDetailView from '../views/production/ProductionOrderDetailView.vue'
import ProductionResultsView from '../views/production/ProductionResultsView.vue'
import QualityControlView from '../views/production/QualityControlView.vue'

// Sales
import SalesOrdersView from '../views/sales/SalesOrdersView.vue'
import SalesOrderCreateView from '../views/sales/SalesOrderCreateView.vue'
import SalesOrderDetailView from '../views/sales/SalesOrderDetailView.vue'
import DeliveriesView from '../views/sales/DeliveriesView.vue'

// Finance
import TransactionsView from '../views/finance/TransactionsView.vue'
import ProductionCostView from '../views/finance/ProductionCostView.vue'
import HppView from '../views/finance/HppView.vue'

// Reports
import ReportsView from '../views/ReportsView.vue'
import InventoryReportView from '../views/reports/InventoryReportView.vue'
import PurchasingReportView from '../views/reports/PurchasingReportView.vue'
import ProductionReportView from '../views/reports/ProductionReportView.vue'
import SalesReportView from '../views/reports/SalesReportView.vue'
import FinanceReportView from '../views/reports/FinanceReportView.vue'

// Admin
import UsersView from '../views/admin/UsersView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: LoginView,
      meta: { public: true },
    },
    {
      path: '/',
      component: AppLayout,
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', component: DashboardView },

        // Master Data
        { path: 'products', component: ProductsView, meta: { roles: ['ADMIN','MANAGER'] } },
        { path: 'products/:id', component: ProductsView, meta: { roles: ['ADMIN','MANAGER'] } },
        { path: 'materials', component: MaterialsView, meta: { roles: ['ADMIN','MANAGER'] } },
        { path: 'categories', component: CategoriesView, meta: { roles: ['ADMIN','MANAGER'] } },
        { path: 'units', component: UnitsView, meta: { roles: ['ADMIN','MANAGER'] } },
        { path: 'suppliers', component: SuppliersView, meta: { roles: ['ADMIN','MANAGER'] } },
        { path: 'customers', component: CustomersView, meta: { roles: ['ADMIN','MANAGER'] } },
        { path: 'warehouses', component: WarehousesView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'bom', component: BomView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION'] } },
        { path: 'bom/create', component: BomCreateView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION'] } },
        { path: 'bom/:id', component: BomView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION'] } },

        // Purchasing
        { path: 'purchasing/requests', component: PurchaseRequestsView, meta: { roles: ['ADMIN','MANAGER','PURCHASING'] } },
        { path: 'purchasing/requests/create', component: PurchaseRequestCreateView, meta: { roles: ['ADMIN','MANAGER','PURCHASING'] } },
        { path: 'purchasing/requests/:id', component: PurchaseRequestDetailView, meta: { roles: ['ADMIN','MANAGER','PURCHASING'] } },
        { path: 'purchasing/orders', component: PurchaseOrdersView, meta: { roles: ['ADMIN','MANAGER','PURCHASING','WAREHOUSE'] } },
        { path: 'purchasing/orders/:id', component: PurchaseOrderDetailView, meta: { roles: ['ADMIN','MANAGER','PURCHASING','WAREHOUSE'] } },
        { path: 'purchasing/receipts', component: GoodsReceiptView, meta: { roles: ['ADMIN','MANAGER','PURCHASING','WAREHOUSE'] } },
        { path: 'purchasing/receipts/:id', component: GoodsReceiptView, meta: { roles: ['ADMIN','MANAGER','PURCHASING','WAREHOUSE'] } },

        // Inventory
        { path: 'inventory', component: StockView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'inventory/movements', component: StockMovementView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'inventory/transfers', component: StockTransferView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'inventory/transfers/create', component: StockTransferCreateView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'inventory/transfers/:id', component: StockTransferView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'inventory/opname', component: StockOpnameView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'inventory/opname/create', component: StockOpnameView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },
        { path: 'inventory/opname/:id', component: StockOpnameDetailView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE'] } },

        // Production
        { path: 'production/planning', component: ProductionPlanningView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION'] } },
        { path: 'production/orders', component: ProductionOrdersView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION'] } },
        { path: 'production/orders/create', component: ProductionOrderCreateView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION'] } },
        { path: 'production/orders/:id', component: ProductionOrderDetailView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION'] } },
        { path: 'production/results', component: ProductionResultsView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION','QC'] } },
        { path: 'production/qc', component: QualityControlView, meta: { roles: ['ADMIN','MANAGER','PRODUCTION','QC'] } },

        // Sales
        { path: 'sales/orders', component: SalesOrdersView, meta: { roles: ['ADMIN','MANAGER','SALES','PURCHASING'] } },
        { path: 'sales/orders/create', component: SalesOrderCreateView, meta: { roles: ['ADMIN','MANAGER','SALES','PURCHASING'] } },
        { path: 'sales/orders/:id', component: SalesOrderDetailView, meta: { roles: ['ADMIN','MANAGER','SALES','PURCHASING'] } },
        { path: 'sales/deliveries', component: DeliveriesView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE','SALES'] } },
        { path: 'sales/deliveries/:id', component: DeliveriesView, meta: { roles: ['ADMIN','MANAGER','WAREHOUSE','SALES'] } },

        // Finance
        { path: 'finance/transactions', component: TransactionsView, meta: { roles: ['ADMIN','MANAGER','FINANCE'] } },
        { path: 'finance/production-cost', component: ProductionCostView, meta: { roles: ['ADMIN','MANAGER','FINANCE'] } },
        { path: 'finance/hpp', component: HppView, meta: { roles: ['ADMIN','MANAGER','FINANCE'] } },

        // Reports
        { path: 'reports', component: ReportsView, meta: { roles: ['ADMIN','MANAGER','FINANCE'] } },
        { path: 'reports/inventory', component: InventoryReportView, meta: { roles: ['ADMIN','MANAGER','FINANCE','WAREHOUSE'] } },
        { path: 'reports/purchasing', component: PurchasingReportView, meta: { roles: ['ADMIN','MANAGER','FINANCE','PURCHASING'] } },
        { path: 'reports/production', component: ProductionReportView, meta: { roles: ['ADMIN','MANAGER','FINANCE','PRODUCTION'] } },
        { path: 'reports/sales', component: SalesReportView, meta: { roles: ['ADMIN','MANAGER','FINANCE'] } },
        { path: 'reports/finance', component: FinanceReportView, meta: { roles: ['ADMIN','MANAGER','FINANCE'] } },

        // Admin
        { path: 'users', component: UsersView, meta: { roles: ['ADMIN'] } },
        { path: 'users/create', component: UsersView, meta: { roles: ['ADMIN'] } },
        { path: 'users/:id', component: UsersView, meta: { roles: ['ADMIN'] } },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
  ],
})

// Navigation guard
router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (!to.meta.public && !authStore.isAuthenticated) {
    return '/login'
  }
  if (to.path === '/login' && authStore.isAuthenticated) {
    return '/dashboard'
  }
  const roles = to.meta.roles as string[] | undefined
  if (roles && roles.length && authStore.userRole && !roles.includes(authStore.userRole)) {
    return '/dashboard'
  }
})

export default router
