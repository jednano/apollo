import DataLoader = require('dataloader')
import { map, sortBy } from 'lodash'

export default new DataLoader(findStockBySkus)

const products = [
	{ sku: 'pink_shirt', only_x_left_in_stock: 25 },
	{ sku: 'blue_shirt', only_x_left_in_stock: 15 },
]

async function findStockBySkus(skus: string[]) {
	return map(
		sortBy(products, ({ sku }) => skus.indexOf(sku)),
		'only_x_left_in_stock',
	)
}
