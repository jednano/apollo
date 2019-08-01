import findStockBySku from '../loaders/findStockBySku'
import Resolver from '../types/Resolver'

const SimpleProduct: Resolver = {
	only_x_left_in_stock: ({ sku }) => findStockBySku.load(sku),
}

export default SimpleProduct
