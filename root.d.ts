declare module 'kill-port' {
	function kill(port: number): Promise<void>
	export = kill
}
