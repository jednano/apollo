import { merge, sortBy } from 'lodash'

import Resolver from '../types/Resolver'

const Query: Resolver = {
	products: async (
		_product,
		{ search }: { search: string },
		{ elasticsearch, sql },
	) => {
		const esItems = sortBy(await elasticsearch({ name: search }), 'sku')
		const skus = esItems.map(item => item.sku)
		const mysqlItems = await sql`
SELECT cpe.sku, cisi.qty as only_x_left_in_stock
FROM catalog_product_entity as cpe
	LEFT JOIN cataloginventory_stock_item AS cisi
		ON cisi.product_id = cpe.entity_id
WHERE cpe.sku IN (${sql.join(skus)})
ORDER BY cpe.sku`
		return {
			items: merge(esItems, mysqlItems),
		}
	},
}

export default Query
