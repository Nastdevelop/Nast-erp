import { api, type Paginated, type ListParams } from './api'

export function makeCrudService<T = any>(path: string) {
  return {
    async list(params: ListParams = {}): Promise<Paginated<T>> {
      const res = await api.get(path, { params: { limit: 100, ...params } })
      return res.data.data
    },
    async get(id: string): Promise<T> {
      const res = await api.get(`${path}/${id}`)
      return res.data.data
    },
    async create(data: Partial<T>): Promise<T> {
      const res = await api.post(path, data)
      return res.data.data
    },
    async update(id: string, data: Partial<T>): Promise<T> {
      const res = await api.patch(`${path}/${id}`, data)
      return res.data.data
    },
    async remove(id: string): Promise<void> {
      await api.delete(`${path}/${id}`)
    },
  }
}

export const categoriesService = makeCrudService('/categories')
export const unitsService = makeCrudService('/units')
export const suppliersService = makeCrudService('/suppliers')
export const customersService = makeCrudService('/customers')
export const warehousesService = makeCrudService('/warehouses')
export const productsService = makeCrudService('/products')
export const materialsService = makeCrudService('/materials')
export const bomService = makeCrudService('/bom')
export const usersService = makeCrudService('/users')
export const stockService = makeCrudService('/stock')
export const purchaseRequestsService = makeCrudService('/purchase-requests')
export const purchaseOrdersService = makeCrudService('/purchase-orders')
export const goodsReceiptsService = makeCrudService('/goods-receipts')
export const salesOrdersService = makeCrudService('/sales-orders')
export const deliveriesService = makeCrudService('/deliveries')
export const productionOrdersService = makeCrudService('/production-orders')
export const productionResultsService = makeCrudService('/production-results')
export const qualityControlService = makeCrudService('/quality-control')
export const stockMovementsService = makeCrudService('/stock-movements')
export const stockTransfersService = makeCrudService('/stock-transfers')
export const stockOpnameService = makeCrudService('/stock-opname')
export const transactionsService = makeCrudService('/transactions')
