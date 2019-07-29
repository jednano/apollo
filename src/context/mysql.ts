import _chalk = require('chalk')
import { createConnection, QueryOptions, Query } from 'mysql'

const { default: chalk } = _chalk

const connection = createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'jed',
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
		chalk.green(`Connected to MySQL db: ${database} as ${user}@${host}.`),
	)
})

connection.on('error', console.error)

process.once('SIGINT', gracefulExit).once('SIGTERM', gracefulExit)

function gracefulExit() {
	console.log(chalk.green('\nClosing MySQL connection...'))
	connection.end(console.error)
}

async function mysql<T>(query: string | QueryOptions): Promise<T>
async function mysql<T>(query: string, values: any): Promise<T>
async function mysql<T>(...args: [string | Query | QueryOptions, any?]) {
	return new Promise<T>((resolve, reject) => {
		if (args.length === 2) {
			connection.query(args[0] as string, args[1], callback)
		} else {
			connection.query(args[0], callback)
		}
		function callback(err: Error, results: T) {
			if (err) {
				reject(err)
				return
			}
			resolve(results)
		}
	})
}

mysql.query = connection.query

export default mysql
