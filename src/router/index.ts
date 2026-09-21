import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Layouts
import AppLayout from '../layouts/AppLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

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
        { path: 'products', component: ProductsView },
        { path: 'products/:id', component: ProductsView },
        { path: 'materials', component: MaterialsView },
        { path: 'categories', component: CategoriesView },
        { path: 'units', component: UnitsView },
        { path: 'suppliers', component: SuppliersView },
        { path: 'customers', component: CustomersView },
        { path: 'warehouses', component: WarehousesView },
        { path: 'bom', component: BomView },
        { path: 'bom/create', component: BomCreateView },
        { path: 'bom/:id', component: BomView },

        // Purchasing
        { path: 'purchasing/requests', component: PurchaseRequestsView },
        { path: 'purchasing/requests/create', component: PurchaseRequestCreateView },
        { path: 'purchasing/requests/:id', component: PurchaseRequestDetailView },
        { path: 'purchasing/orders', component: PurchaseOrdersView },
        { path: 'purchasing/orders/:id', component: PurchaseOrderDetailView },
        { path: 'purchasing/receipts', component: GoodsReceiptView },
        { path: 'purchasing/receipts/:id', component: GoodsReceiptView },

        // Inventory
        { path: 'inventory', component: StockView },
        { path: 'inventory/movements', component: StockMovementView },
        { path: 'inventory/transfers', component: StockTransferView },
        { path: 'inventory/transfers/create', component: StockTransferCreateView },
        { path: 'inventory/transfers/:id', component: StockTransferView },
        { path: 'inventory/opname', component: StockOpnameView },
        { path: 'inventory/opname/create', component: StockOpnameView },
        { path: 'inventory/opname/:id', component: StockOpnameDetailView },

        // Production
        { path: 'production/planning', component: ProductionPlanningView },
        { path: 'production/orders', component: ProductionOrdersView },
        { path: 'production/orders/create', component: ProductionOrderCreateView },
        { path: 'production/orders/:id', component: ProductionOrderDetailView },
        { path: 'production/results', component: ProductionResultsView },
        { path: 'production/qc', component: QualityControlView },

        // Sales
        { path: 'sales/orders', component: SalesOrdersView },
        { path: 'sales/orders/create', component: SalesOrderCreateView },
        { path: 'sales/orders/:id', component: SalesOrderDetailView },
        { path: 'sales/deliveries', component: DeliveriesView },
        { path: 'sales/deliveries/:id', component: DeliveriesView },

        // Finance
        { path: 'finance/transactions', component: TransactionsView },
        { path: 'finance/production-cost', component: ProductionCostView },
        { path: 'finance/hpp', component: HppView },

        // Reports
        { path: 'reports', component: ReportsView },
        { path: 'reports/inventory', component: InventoryReportView },
        { path: 'reports/purchasing', component: PurchasingReportView },
        { path: 'reports/production', component: ProductionReportView },
        { path: 'reports/sales', component: SalesReportView },
        { path: 'reports/finance', component: FinanceReportView },

        // Admin
        { path: 'users', component: UsersView },
        { path: 'users/create', component: UsersView },
        { path: 'users/:id', component: UsersView },
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
})

export default router
