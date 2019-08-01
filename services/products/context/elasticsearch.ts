import { Client, RequestParams, ApiResponse } from '@elastic/elasticsearch'

const client = new Client({ node: process.env.ELASTICSEARCH_CLIENT })

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

export default async function elasticsearch(query: Partial<Source>) {
	const searchParams: RequestParams.Search<SearchBody> = {
		index: process.env.ELASTICSEARCH_MAGENTO_INDEX,
		body: {
			query: {
				match: query,
			},
		},
	}
	const response: ApiResponse<SearchResponse<Source>> = await client.search(
		searchParams,
	)
	return response.body.hits.hits.map(hit => hit._source)
}
