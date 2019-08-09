import mysql from 'mysql'

type Operator =
	| '='
	| '!='
	| '>'
	| '<'
	| '>='
	| '<='
	| 'IN'
	| 'NOT IN'
	| 'IS'
	| 'IS NOT'
	| 'LIKE'
	| 'NOT LIKE'
type Conjunction = 'AND' | 'OR'

type Primitive = string | number | boolean
export type ExpressionType<T extends Primitive = Primitive> = T | (() => T)

export class Expression<T extends ExpressionType> {
	public constructor(public value: T) {}
	public toString() {
		switch (typeof this.value) {
			case 'function':
				return ((this.value as unknown) as (() => T))()
			case 'string':
				return `"${this.value}"`
			case 'number':
				return this.value.toString()
			default:
				throw new TypeError(
					'Expression must be a string, number or function.',
				)
		}
	}
}

export class Predicate<
	P,
	L extends ExpressionType = ExpressionType,
	R extends ExpressionType = ExpressionType
> extends Array<[Expression<L>, Operator, Expression<R>]> {
	private leftExpression: Expression<L>
	public get done() {
		return this.length === 1
	}
	public constructor(leftExpression: L, public parent?: P) {
		super()
		this.leftExpression = new Expression(leftExpression)
	}
	public eq(rightExpression: R) {
		return this.end('=', rightExpression)
	}
	public notEq(rightExpression: R) {
		return this.end('!=', rightExpression)
	}
	public gt(rightExpression: R) {
		return this.end('>', rightExpression)
	}
	public gte(rightExpression: R) {
		return this.end('>=', rightExpression)
	}
	public lt(rightExpression: R) {
		return this.end('<', rightExpression)
	}
	public lte(rightExpression: R) {
		return this.end('<=', rightExpression)
	}
	public is(rightExpression: R) {
		return this.end('IS', rightExpression)
	}
	public isNot(rightExpression: R) {
		return this.end('IS NOT', rightExpression)
	}
	public in(rightExpression: R) {
		return this.end('IN', rightExpression)
	}
	public notIn(rightExpression: R) {
		return this.end('NOT IN', rightExpression)
	}
	public like(rightExpression: R) {
		return this.end('LIKE', rightExpression)
	}
	public notLike(rightExpression: R) {
		return this.end('NOT LIKE', rightExpression)
	}
	public push(...items: [Expression<L>, Operator, Expression<R>][]) {
		if (this.done) {
			throw new Error('Predicate done. You may not push any more items.')
		}
		return super.push(...items)
	}
	private end(operator: Operator, rightExpression: R) {
		this.push([
			this.leftExpression,
			operator,
			new Expression(rightExpression),
		])
		return this.parent || ((this as any) as P)
	}
	public toString() {
		if (!this.done) {
			throw new Error('Incomplete predicate. Missing "right" expression.')
		}
		return this[0].map(x => x.toString()).join(' ')
	}
}

export class WhereClause extends Array<
	Predicate<WhereClause> | [Conjunction, Predicate<WhereClause>]
> {
	public values: string[] = []
	public predicate?: Predicate<WhereClause>
	public static start(expression: Primitive) {
		const where = new WhereClause()
		where.push((where.predicate = new Predicate(expression, where)))
		return where.predicate
	}
	public and<T extends ExpressionType>(expression: T) {
		return this.chain('AND', expression)
	}
	public or<T extends ExpressionType>(expression: T) {
		return this.chain('OR', expression)
	}
	private chain<T extends ExpressionType>(
		conjunction: Conjunction,
		expression: T,
	) {
		const predicate = new Predicate(expression, this)
		this.push([conjunction, predicate])
		return (this.predicate = predicate)
	}
	public toString() {
		return (
			'\nWHERE ' +
			this.map(line =>
				line instanceof Predicate
					? line.toString()
					: line.map(x => x.toString()).join(' '),
			).join('\n  ')
		)
	}
}

export interface Product {
	id: number
	title: string
	color: string
}

export interface AppConfig {
	search: WhereClause
}

export class App {
	private config: AppConfig = {
		search: WhereClause.start('title').eq('?'),
	}
	public extend(extension: { search(query: WhereClause): WhereClause }) {
		Object.keys(extension).forEach(key => {
			const ext = extension[key as keyof AppConfig]
			this.config[key as keyof AppConfig] = ext(this.config.search)
		})
		return this
	}
	public search(query: string) {
		return this.config.search.values.push(query)
	}
}

// const products = [
//   { id: 1, title: 'Nice blue shirt', color: 'blue' },
//   { id: 2, title: 'Nice pink shirt', color: 'pink' },
//   { id: 3, title: 'Denim Pants', color: 'blue' }
// ]

const app = new App()

console.log(app.search('shirt'))
// WHERE "title" = shirt

app.extend({
	search(query) {
		return query
			.and('color')
			.notEq('black')
			.or('color')
			.eq('red')
			.and('price')
			.lte(100)
	},
})

console.log(app.search('shirt'))
// []

console.log(app.search('blue'))
// [ { id: 1, title: 'Nice blue shirt', color: 'blue' } ]

console.log(
	WhereClause.start('foo')
		.eq('bar')
		.and('baz')
		.lte(42)
		.or('qux')
		.notLike('corge')
		.toString(),
)
