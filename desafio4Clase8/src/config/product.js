import crypto from'crypto'
export class product{
    constructor(title, description, price, stock, code, image) {
        this.title = title
        this.description = description
        this.price = price
        this.stock = stock
        this.code = code
        this.image = image
        this.id = crypto.randomBytes(10).toString('hex')
    }
}