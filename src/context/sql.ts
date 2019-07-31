import _chalk = require('chalk')
import { createConnection } from 'mysql'
import sqltag, { empty, join, RawValue } from 'sql-template-tag'

const { default: chalk } = _chalk

const connection = createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB_NAME,
})

connection.connect(err => {
	if (err) {
		console.error(err)
		return
	}
	const {
		config: { host, user, database },
	} = connection
	console.log(
		chalk.green(
			`Connected to MySQL db: ${database} as ${user}@${host} on thread ${
				connection.threadId
			}.`,
		),
	)
})

connection.on('error', console.error)

process.once('SIGINT', gracefulExit).once('SIGTERM', gracefulExit)

function gracefulExit() {
	console.log(chalk.green('\nClosing MySQL connection...'))
	connection.end(err => {
		if (err) {
			console.error(err)
		}
	})
}

export default async function sql<T = any>(
	strings: TemplateStringsArray,
	...values: RawValue[]
): Promise<T> {
	return new Promise((resolve, reject) => {
		const query = sqltag(strings, ...values)
		connection.query(query.sql, query.values, (err: Error, results: T) => {
			if (err) {
				reject(err)
				return
			}
			resolve(results)
		})
	})
}

sql.empty = empty
sql.join = join
