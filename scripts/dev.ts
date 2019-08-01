import chalk from 'chalk'
import { spawn } from 'child_process'
import * as fs from 'fs'
import kill = require('kill-port')

fs.readdir('services', (err, services) => {
	if (err) {
		console.error(chalk.red(`could not read services directory: ${err}`))
		throw err
	}
	Promise.all(services.map(startService)).then(startGateway)
})

let startingPort = 4001

const ports: Record<number, string> = {}
function startService(service: string) {
	console.log(chalk.green(`Starting ${service} service...`))
	return new Promise((resolve, reject) => {
		const port = startingPort++
		ports[port] = service
		const p = spawn('ts-node-dev', [
			'--no-notify',
			'--respawn',
			'--transpileOnly',
			`services/${service}`,
			`${port}`,
		])
		p.stdout.on('data', data => {
			const msg = `[${service}]: ${data}`
			if (data.indexOf('🚀') !== -1) {
				console.log(chalk.green(msg))
				resolve()
			} else {
				console.log(msg)
			}
		})
		p.stderr.on('data', data => {
			const msg = `[${service}] ${data}`
			console.error(chalk.red(`[Error]${msg}`))
			reject(new Error(msg))
		})
		p.on('close', code => {
			if (code === null) {
				return
			}
			const color = code === 0 ? chalk.green : chalk.red
			console.log(color(`${service} service exited with code ${code}`))
		})
	})
}

process.once('SIGINT', gracefulExit).once('SIGTERM', gracefulExit)

export function gracefulExit() {
	Promise.all(
		Object.keys(ports).map(port => {
			console.log()
			console.log(
				chalk.green(`Stopping ${ports[+port]} service on port ${port}...`),
			)
			return kill(+port)
		}),
	)
		.then(() => kill(4000))
		.then(() => {
			console.log()
			console.log(chalk.green('All services stopped successfully'))
		})
		.catch(err => {
			console.error(chalk.red(err))
		})
}

function startGateway() {
	const p = spawn('ts-node-dev', [
		'--no-notify',
		'--respawn',
		'--transpileOnly',
		'gateway.ts',
	])
	p.stdout.on('data', data => {
		const msg = `[gateway]: ${data}`
		if (data.indexOf('🚀') !== -1) {
			console.log(chalk.green(msg))
		} else {
			console.log(msg)
		}
	})
	p.stderr.on('data', data => {
		console.error(chalk.red(`[Error][gateway] ${data}`))
	})
	p.on('close', code => {
		if (code === null) {
			return
		}
		const color = code === 0 ? chalk.green : chalk.red
		console.log(color(`Gateway exited with code ${code}`))
	})
}
