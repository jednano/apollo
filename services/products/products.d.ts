declare namespace NodeJS {
	interface ProcessEnv {
		ELASTICSEARCH_CLIENT: string
		ELASTICSEARCH_MAGENTO_INDEX: string
		MYSQL_HOST: string
		MYSQL_USER: string
		MYSQL_PASSWORD: string
		MYSQL_DB_NAME: string
	}
}
