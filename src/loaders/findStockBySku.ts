import DataLoader = require('dataloader')
import { map, sortBy } from 'lodash'

import sql from '../context/sql'

export default new DataLoader(findStockBySkus)

async function findStockBySkus(skus: string[]) {
	const key = 'only_x_left_in_stock'
	const products = await sql`
SELECT cpe.sku, cisi.qty ${key}
FROM catalog_product_entity cpe
	LEFT JOIN cataloginventory_stock_item cisi
		ON cisi.product_id = cpe.entity_id
WHERE cpe.sku IN (${sql.join(skus)})`
	return map(sortBy(products, ({ sku }) => skus.indexOf(sku)), key)
}
