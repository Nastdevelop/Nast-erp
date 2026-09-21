// ─── Mock data for UI demonstration ───────────────────────────────────────────

export const mockCategories = [
  { id: '1', name: 'Sofa', description: 'Sofa dan kursi santai', isActive: true },
  { id: '2', name: 'Lemari', description: 'Lemari pakaian dan rak', isActive: true },
  { id: '3', name: 'Meja', description: 'Meja makan dan kerja', isActive: true },
  { id: '4', name: 'Kursi', description: 'Kursi makan dan kantor', isActive: true },
  { id: '5', name: 'Tempat Tidur', description: 'Ranjang dan bed frame', isActive: true },
  { id: '6', name: 'Rak', description: 'Rak buku dan display', isActive: false },
]

export const mockUnits = [
  { id: '1', name: 'Pieces', symbol: 'PCS' },
  { id: '2', name: 'Kilogram', symbol: 'KG' },
  { id: '3', name: 'Liter', symbol: 'LTR' },
  { id: '4', name: 'Meter', symbol: 'M' },
  { id: '5', name: 'Roll', symbol: 'ROLL' },
]

export const mockProducts = [
  { id: '1', code: 'FG-001', name: 'Sofa 3 Seater Minimalis', category: 'Sofa', unit: 'PCS', type: 'FINISHED_GOOD', sellingPrice: 4500000, minimumStock: 5, targetStock: 50, currentStock: 15, isActive: true },
  { id: '2', code: 'FG-002', name: 'Lemari Pakaian 3 Pintu', category: 'Lemari', unit: 'PCS', type: 'FINISHED_GOOD', sellingPrice: 3200000, minimumStock: 3, targetStock: 30, currentStock: 8, isActive: true },
  { id: '3', code: 'FG-003', name: 'Meja Makan 6 Kursi', category: 'Meja', unit: 'PCS', type: 'FINISHED_GOOD', sellingPrice: 5800000, minimumStock: 2, targetStock: 20, currentStock: 20, isActive: true },
  { id: '4', code: 'FG-004', name: 'Kursi Makan Jati', category: 'Kursi', unit: 'PCS', type: 'FINISHED_GOOD', sellingPrice: 850000, minimumStock: 10, targetStock: 80, currentStock: 45, isActive: true },
  { id: '5', code: 'FG-005', name: 'Tempat Tidur 160x200', category: 'Tempat Tidur', unit: 'PCS', type: 'FINISHED_GOOD', sellingPrice: 6200000, minimumStock: 2, targetStock: 15, currentStock: 3, isActive: true },
  { id: '6', code: 'FG-006', name: 'Rak Buku Minimalis', category: 'Rak', unit: 'PCS', type: 'FINISHED_GOOD', sellingPrice: 1200000, minimumStock: 5, targetStock: 25, currentStock: 30, isActive: false },
]

export const mockMaterials = [
  { id: '1', code: 'RM-001', name: 'Kayu Jati', category: 'Bahan Baku', unit: 'KG', type: 'RAW_MATERIAL', minimumStock: 100, currentStock: 850, isActive: true },
  { id: '2', code: 'RM-002', name: 'Multipleks 18mm', category: 'Bahan Baku', unit: 'M', type: 'RAW_MATERIAL', minimumStock: 50, currentStock: 120, isActive: true },
  { id: '3', code: 'RM-003', name: 'Busa Sofa Density 40', category: 'Bahan Baku', unit: 'KG', type: 'RAW_MATERIAL', minimumStock: 50, currentStock: 230, isActive: true },
  { id: '4', code: 'RM-004', name: 'Kain Oscar', category: 'Bahan Baku', unit: 'M', type: 'RAW_MATERIAL', minimumStock: 30, currentStock: 45, isActive: true },
  { id: '5', code: 'RM-005', name: 'Lem Kayu Fox', category: 'Bahan Baku', unit: 'KG', type: 'RAW_MATERIAL', minimumStock: 20, currentStock: 12, isActive: true },
  { id: '6', code: 'RM-006', name: 'Cat Dasar', category: 'Bahan Baku', unit: 'LTR', type: 'RAW_MATERIAL', minimumStock: 15, currentStock: 28, isActive: true },
  { id: '7', code: 'RM-007', name: 'Paku 5cm', category: 'Bahan Baku', unit: 'KG', type: 'RAW_MATERIAL', minimumStock: 10, currentStock: 35, isActive: true },
  { id: '8', code: 'RM-008', name: 'Engsel Kupu-Kupu', category: 'Hardware', unit: 'PCS', type: 'RAW_MATERIAL', minimumStock: 100, currentStock: 450, isActive: true },
]

export const mockSuppliers = [
  { id: '1', code: 'SUP-001', name: 'PT Kayu Nusantara', phone: '021-5551234', email: 'order@kayunusantara.co.id', address: 'Jl. Industri No. 12, Jakarta', isActive: true },
  { id: '2', code: 'SUP-002', name: 'CV Busa Sejahtera', phone: '022-5556789', email: 'sales@busasejahtera.com', address: 'Jl. Raya Bandung No. 45', isActive: true },
  { id: '3', code: 'SUP-003', name: 'PT Textile Mandiri', phone: '024-5552233', email: 'info@textilemandiri.com', address: 'Kawasan Industri Semarang', isActive: true },
  { id: '4', code: 'SUP-004', name: 'Toko Hardware Jaya', phone: '031-5554455', email: 'jaya@hardware.co.id', address: 'Jl. Pahlawan No. 8, Surabaya', isActive: false },
]

export const mockCustomers = [
  { id: '1', code: 'CUST-001', name: 'PT Griya Indah Properti', phone: '021-7891234', email: 'purchasing@griyaindah.com', address: 'Jl. Sudirman No. 100, Jakarta', isActive: true },
  { id: '2', code: 'CUST-002', name: 'CV Toko Furnitur Makmur', phone: '022-7894567', email: 'order@tokofurnitur.com', address: 'Jl. Asia Afrika No. 25, Bandung', isActive: true },
  { id: '3', code: 'CUST-003', name: 'Hotel Bintang Lima', phone: '361-7897890', email: 'procurement@hotelbintang.com', address: 'Jl. Legian No. 50, Bali', isActive: true },
  { id: '4', code: 'CUST-004', name: 'Yayasan Pendidikan Maju', phone: '024-7891122', email: 'admin@yayasanmaju.org', address: 'Jl. Diponegoro No. 7, Semarang', isActive: true },
]

export const mockWarehouses = [
  { id: '1', code: 'WH-001', name: 'Gudang Bahan Baku Utama', type: 'RAW_MATERIAL', isActive: true },
  { id: '2', code: 'WH-002', name: 'Gudang WIP Produksi', type: 'WIP', isActive: true },
  { id: '3', code: 'WH-003', name: 'Gudang Barang Jadi', type: 'FINISHED_GOOD', isActive: true },
]

export const mockBoms = [
  {
    id: '1', product: 'Sofa 3 Seater Minimalis', productCode: 'FG-001', version: 'v1.0', isActive: true,
    items: [
      { material: 'Kayu Jati', quantity: 12, unit: 'KG' },
      { material: 'Busa Sofa Density 40', quantity: 15, unit: 'KG' },
      { material: 'Kain Oscar', quantity: 8, unit: 'M' },
      { material: 'Lem Kayu Fox', quantity: 1, unit: 'KG' },
      { material: 'Paku 5cm', quantity: 0.5, unit: 'KG' },
    ]
  },
  {
    id: '2', product: 'Lemari Pakaian 3 Pintu', productCode: 'FG-002', version: 'v2.0', isActive: true,
    items: [
      { material: 'Kayu Jati', quantity: 25, unit: 'KG' },
      { material: 'Multipleks 18mm', quantity: 6, unit: 'M' },
      { material: 'Engsel Kupu-Kupu', quantity: 6, unit: 'PCS' },
      { material: 'Cat Dasar', quantity: 2, unit: 'LTR' },
    ]
  },
]

export const mockPurchaseRequests = [
  { id: '1', number: 'PR-2026-001', requestedBy: 'Sari Dewi', status: 'APPROVED', requestDate: '2026-09-10', approvedBy: 'Budi Santoso', items: 3 },
  { id: '2', number: 'PR-2026-002', requestedBy: 'Sari Dewi', status: 'SUBMITTED', requestDate: '2026-09-15', approvedBy: null, items: 2 },
  { id: '3', number: 'PR-2026-003', requestedBy: 'Sari Dewi', status: 'DRAFT', requestDate: '2026-09-18', approvedBy: null, items: 4 },
  { id: '4', number: 'PR-2026-004', requestedBy: 'Sari Dewi', status: 'REJECTED', requestDate: '2026-09-05', approvedBy: 'Budi Santoso', items: 1 },
]

export const mockPurchaseOrders = [
  { id: '1', number: 'PO-2026-001', supplier: 'PT Kayu Nusantara', status: 'COMPLETED', orderDate: '2026-09-11', expectedDate: '2026-09-18', total: 8500000 },
  { id: '2', number: 'PO-2026-002', supplier: 'CV Busa Sejahtera', status: 'SENT', orderDate: '2026-09-16', expectedDate: '2026-09-23', total: 4200000 },
  { id: '3', number: 'PO-2026-003', supplier: 'PT Kayu Nusantara', status: 'PARTIAL', orderDate: '2026-09-17', expectedDate: '2026-09-25', total: 12000000 },
  { id: '4', number: 'PO-2026-004', supplier: 'PT Textile Mandiri', status: 'DRAFT', orderDate: '2026-09-19', expectedDate: '2026-09-28', total: 3600000 },
]

export const mockGoodsReceipts = [
  { id: '1', number: 'GR-2026-001', purchaseOrder: 'PO-2026-001', warehouse: 'Gudang Bahan Baku Utama', receivedBy: 'Andi Wijaya', receivedAt: '2026-09-17', items: 2 },
  { id: '2', number: 'GR-2026-002', purchaseOrder: 'PO-2026-003', warehouse: 'Gudang Bahan Baku Utama', receivedBy: 'Andi Wijaya', receivedAt: '2026-09-20', items: 1 },
]

export const mockStocks = [
  { id: '1', product: 'Kayu Jati', code: 'RM-001', warehouse: 'Gudang Bahan Baku Utama', quantity: 850, reservedQuantity: 120, unit: 'KG' },
  { id: '2', product: 'Busa Sofa Density 40', code: 'RM-003', warehouse: 'Gudang Bahan Baku Utama', quantity: 230, reservedQuantity: 0, unit: 'KG' },
  { id: '3', product: 'Kain Oscar', code: 'RM-004', warehouse: 'Gudang Bahan Baku Utama', quantity: 45, reservedQuantity: 16, unit: 'M' },
  { id: '4', product: 'Lem Kayu Fox', code: 'RM-005', warehouse: 'Gudang Bahan Baku Utama', quantity: 12, reservedQuantity: 2, unit: 'KG' },
  { id: '5', product: 'Sofa 3 Seater Minimalis', code: 'FG-001', warehouse: 'Gudang Barang Jadi', quantity: 15, reservedQuantity: 5, unit: 'PCS' },
  { id: '6', product: 'Lemari Pakaian 3 Pintu', code: 'FG-002', warehouse: 'Gudang Barang Jadi', quantity: 8, reservedQuantity: 0, unit: 'PCS' },
  { id: '7', product: 'Meja Makan 6 Kursi', code: 'FG-003', warehouse: 'Gudang Barang Jadi', quantity: 20, reservedQuantity: 3, unit: 'PCS' },
]

export const mockMovements = [
  { id: '1', date: '2026-09-17', product: 'Kayu Jati', warehouse: 'Gudang Bahan Baku Utama', type: 'PURCHASE_IN', quantity: 200, reference: 'GR-2026-001', createdBy: 'Andi Wijaya' },
  { id: '2', date: '2026-09-18', product: 'Kayu Jati', warehouse: 'Gudang Bahan Baku Utama', type: 'PRODUCTION_OUT', quantity: -120, reference: 'PO-PRD-003', createdBy: 'System' },
  { id: '3', date: '2026-09-19', product: 'Sofa 3 Seater Minimalis', warehouse: 'Gudang Barang Jadi', type: 'PRODUCTION_IN', quantity: 10, reference: 'PO-PRD-003', createdBy: 'System' },
  { id: '4', date: '2026-09-20', product: 'Sofa 3 Seater Minimalis', warehouse: 'Gudang Barang Jadi', type: 'SALES_OUT', quantity: -5, reference: 'SO-2026-001', createdBy: 'System' },
  { id: '5', date: '2026-09-20', product: 'Kain Oscar', warehouse: 'Gudang Bahan Baku Utama', type: 'PURCHASE_IN', quantity: 30, reference: 'GR-2026-002', createdBy: 'Andi Wijaya' },
]

export const mockTransfers = [
  { id: '1', number: 'TR-2026-001', source: 'Gudang Bahan Baku Utama', destination: 'Gudang WIP Produksi', status: 'COMPLETED', requestedBy: 'Hendra Kusuma', requestedAt: '2026-09-15', items: 3 },
  { id: '2', number: 'TR-2026-002', source: 'Gudang WIP Produksi', destination: 'Gudang Barang Jadi', status: 'IN_TRANSIT', requestedBy: 'Hendra Kusuma', requestedAt: '2026-09-19', items: 1 },
  { id: '3', number: 'TR-2026-003', source: 'Gudang Bahan Baku Utama', destination: 'Gudang WIP Produksi', status: 'REQUESTED', requestedBy: 'Hendra Kusuma', requestedAt: '2026-09-21', items: 2 },
]

export const mockOpnames = [
  { id: '1', number: 'OP-2026-001', warehouse: 'Gudang Bahan Baku Utama', status: 'COMPLETED', createdBy: 'Andi Wijaya', createdAt: '2026-09-01', items: 8 },
  { id: '2', number: 'OP-2026-002', warehouse: 'Gudang Barang Jadi', status: 'COUNTING', createdBy: 'Andi Wijaya', createdAt: '2026-09-20', items: 6 },
]

export const mockProductionPlanning = [
  { id: '1', product: 'Sofa 3 Seater Minimalis', code: 'FG-001', currentStock: 15, targetStock: 50, need: 35 },
  { id: '2', product: 'Lemari Pakaian 3 Pintu', code: 'FG-002', currentStock: 8, targetStock: 20, need: 12 },
  { id: '3', product: 'Meja Makan 6 Kursi', code: 'FG-003', currentStock: 20, targetStock: 20, need: 0 },
  { id: '4', product: 'Kursi Makan Jati', code: 'FG-004', currentStock: 45, targetStock: 80, need: 35 },
  { id: '5', product: 'Tempat Tidur 160x200', code: 'FG-005', currentStock: 3, targetStock: 15, need: 12 },
]

export const mockProductionOrders = [
  { id: '1', number: 'PRD-2026-001', product: 'Sofa 3 Seater Minimalis', warehouse: 'Gudang WIP Produksi', quantity: 35, plannedDate: '2026-09-25', status: 'IN_PROGRESS', createdBy: 'Hendra Kusuma' },
  { id: '2', number: 'PRD-2026-002', product: 'Lemari Pakaian 3 Pintu', warehouse: 'Gudang WIP Produksi', quantity: 12, plannedDate: '2026-09-28', status: 'MATERIAL_RESERVED', createdBy: 'Hendra Kusuma' },
  { id: '3', number: 'PRD-2026-003', product: 'Kursi Makan Jati', warehouse: 'Gudang WIP Produksi', quantity: 35, plannedDate: '2026-09-22', status: 'COMPLETED', createdBy: 'Hendra Kusuma' },
  { id: '4', number: 'PRD-2026-004', product: 'Tempat Tidur 160x200', warehouse: 'Gudang WIP Produksi', quantity: 12, plannedDate: '2026-10-05', status: 'DRAFT', createdBy: 'Hendra Kusuma' },
]

export const mockProductionResults = [
  { id: '1', productionOrder: 'PRD-2026-003', product: 'Kursi Makan Jati', targetQty: 35, goodQty: 33, rejectQty: 2, productionDate: '2026-09-20', operator: 'Hendra Kusuma' },
  { id: '2', productionOrder: 'PRD-2026-001', product: 'Sofa 3 Seater Minimalis', targetQty: 35, goodQty: 10, rejectQty: 1, productionDate: '2026-09-21', operator: 'Hendra Kusuma' },
]

export const mockQCRecords = [
  { id: '1', productionOrder: 'PRD-2026-003', product: 'Kursi Makan Jati', goodQty: 33, rejectQty: 2, status: 'APPROVED', checkedBy: 'Budi Santoso', checkedAt: '2026-09-21', notes: 'Minor surface defects on 2 units' },
  { id: '2', productionOrder: 'PRD-2026-001', product: 'Sofa 3 Seater Minimalis', goodQty: 10, rejectQty: 1, status: 'APPROVED', checkedBy: 'Budi Santoso', checkedAt: '2026-09-22', notes: 'Color mismatch on 1 unit' },
]

export const mockSalesOrders = [
  { id: '1', number: 'SO-2026-001', customer: 'PT Griya Indah Properti', status: 'COMPLETED', orderDate: '2026-09-12', items: 2, total: 13500000 },
  { id: '2', number: 'SO-2026-002', customer: 'CV Toko Furnitur Makmur', status: 'PARTIAL', orderDate: '2026-09-16', items: 3, total: 27600000 },
  { id: '3', number: 'SO-2026-003', customer: 'Hotel Bintang Lima', status: 'CONFIRMED', orderDate: '2026-09-19', items: 5, total: 45800000 },
  { id: '4', number: 'SO-2026-004', customer: 'Yayasan Pendidikan Maju', status: 'DRAFT', orderDate: '2026-09-21', items: 1, total: 8500000 },
]

export const mockDeliveries = [
  { id: '1', number: 'DLV-2026-001', salesOrder: 'SO-2026-001', warehouse: 'Gudang Barang Jadi', deliveredBy: 'Andi Wijaya', deliveredAt: '2026-09-15', items: 2 },
  { id: '2', number: 'DLV-2026-002', salesOrder: 'SO-2026-002', warehouse: 'Gudang Barang Jadi', deliveredBy: 'Andi Wijaya', deliveredAt: '2026-09-19', items: 2 },
]

export const mockTransactions = [
  { id: '1', type: 'INCOME', referenceType: 'SALES', reference: 'SO-2026-001', amount: 13500000, description: 'Payment from PT Griya Indah', date: '2026-09-16', createdBy: 'Rina Pertiwi' },
  { id: '2', type: 'EXPENSE', referenceType: 'PURCHASE', reference: 'PO-2026-001', amount: 8500000, description: 'Payment to PT Kayu Nusantara', date: '2026-09-17', createdBy: 'Rina Pertiwi' },
  { id: '3', type: 'INCOME', referenceType: 'SALES', reference: 'SO-2026-002', amount: 18000000, description: 'Partial payment from CV Toko Furnitur', date: '2026-09-19', createdBy: 'Rina Pertiwi' },
  { id: '4', type: 'EXPENSE', referenceType: 'OTHER', reference: 'OPS-001', amount: 2500000, description: 'Biaya listrik dan operasional September', date: '2026-09-20', createdBy: 'Rina Pertiwi' },
]

export const mockProductionCosts = [
  { id: '1', productionOrder: 'PRD-2026-003', product: 'Kursi Makan Jati', qty: 33, materialCost: 5800000, laborCost: 1650000, overheadCost: 990000, totalCost: 8440000, hpp: 255757 },
  { id: '2', productionOrder: 'PRD-2026-001', product: 'Sofa 3 Seater Minimalis', qty: 10, materialCost: 8500000, laborCost: 1500000, overheadCost: 1100000, totalCost: 11100000, hpp: 1110000 },
]

export const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@erp.com', role: 'ADMIN', isActive: true, createdAt: '2026-01-01' },
  { id: '2', name: 'Budi Santoso', email: 'manager@erp.com', role: 'MANAGER', isActive: true, createdAt: '2026-01-01' },
  { id: '3', name: 'Sari Dewi', email: 'purchasing@erp.com', role: 'PURCHASING', isActive: true, createdAt: '2026-01-15' },
  { id: '4', name: 'Andi Wijaya', email: 'warehouse@erp.com', role: 'WAREHOUSE', isActive: true, createdAt: '2026-01-15' },
  { id: '5', name: 'Hendra Kusuma', email: 'production@erp.com', role: 'PRODUCTION', isActive: true, createdAt: '2026-02-01' },
  { id: '6', name: 'Rina Pertiwi', email: 'finance@erp.com', role: 'FINANCE', isActive: true, createdAt: '2026-02-01' },
  { id: '7', name: 'Dedi Prasetyo', email: 'warehouse2@erp.com', role: 'WAREHOUSE', isActive: false, createdAt: '2026-03-01' },
]
