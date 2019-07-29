import { Client, RequestParams, ApiResponse } from '@elastic/elasticsearch'

const elasticsearch = new Client({ node: 'http://localhost:9200' })

export default { search }

interface Source {
	store_id: string
	sku: string
	status: string
	status_value: string
	visibility: string
	tax_class_id: string
	tax_class_id_value: string
	name: string
	category_ids: number[]
	position_category_2: string
	name_category_2: string
	position_category_3: string
	name_category_3: string
	price_0_1: string
	price_1_1: string
	price_2_1: string
	price_3_1: string
}

interface SearchBody {
	query: {
		match: Partial<Source>
	}
}

interface SearchResponse<T> {
	hits: {
		hits: Array<{
			_source: T
		}>
	}
}

async function search(query: Partial<Source>) {
	const searchParams: RequestParams.Search<SearchBody> = {
		index: 'magento2_product_1_v1',
		body: {
			query: {
				match: query,
			},
		},
	}
	const response: ApiResponse<
		SearchResponse<Source>
	> = await elasticsearch.search(searchParams)
	return response.body.hits.hits.map(hit => hit._source)
}
