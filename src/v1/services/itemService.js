const pool = require("../connection/conn");

async function getItems() {
  const [results] = await pool.query("SELECT * FROM grocery");
  return results;
}

async function getItemsbyId(id) {
  const [result] = await pool.query(`SELECT * FROM grocery WHERE id = ${id}`)
  console.log(result)
  return result
}

async function getItemsOffSet(start, limit) {
  let getQuery = 'SELECT * FROM grocery'
  if(limit !== "") getQuery += ` LIMIT ${limit}`
  getQuery += ` OFFSET ${start}`

  const [result] = await pool.query(getQuery)
  return result
}

async function getItemsbyCount(count) {
  const [result] = await pool.query(`SELECT * FROM grocery LIMIT ${count}`)
  return result
}

async function addItem(body) {
  const { product_name, brand, price, quantity, expiration_date, category, supplier } = body
  const [result] = await pool.query(
  `INSERT INTO grocery (product_name, brand, price, quantity, expiration_date, category, supplier) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [product_name, brand, price, quantity, expiration_date, category, supplier]
);
  const newid = result.insertId
  return newid
}

async function updateItem(id, body) {
  let updateQuery = 'UPDATE grocery SET '
  const values = []
  const keys = Object.keys(body)

  keys.forEach((key, index) => {
    updateQuery += `${key} = ?`
    if (index < keys.length - 1) updateQuery += ','
    values.push(body[key])
  })

  updateQuery += ' WHERE id = ?'
  values.push(id)

  const [result] = await pool.query(updateQuery, values)
  return result
}



async function deleteItem(id) {
  const [result] = await pool.query(`
  DELETE from grocery where id = ${id}
  `)

  return id
}

module.exports = { getItems, getItemsbyId, getItemsbyCount, getItemsOffSet, addItem, updateItem, deleteItem };
