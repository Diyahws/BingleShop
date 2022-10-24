const express = require('express')
const { where } = require('sequelize')
const { users } = require('./models')
const { items } = require('./models')
const { orders } = require('./models')
const { detail_orders } = require('./models')
const app = express()
const port = 3004

app.use(express.json())

app.get('/health-check', (req, res) => {
  res.json({
    message: 'Health check success'
  })
})

// registrasi user
app.post('/register', async (req, res) => {
  const { email, nama, password, alamat_user } = req.body
  if (email == '' || nama == '' || password == '' || alamat_user == '') {
    if (email == '') {
      return res.status(400).json({
        message: 'E-mail cannot be empty'
      })
    }
    if (nama == '') {
      return res.status(400).json({
        message: 'Name cannot be empty'
      })
    }
    if (password == '') {
      return res.status(400).json({
        message: 'Password cannot be empty'
      })
    }
    if (alamat_user == '') {
      return res.status(400).json({
        message: 'Address cannot be empty'
      })
    }
  }

  // check
  const myUser = await users.findOne({
    where: {
      email: email
    }
  })
  if (myUser != null) {
    return res.status(400).json({
      message: 'E-mail already exist'
    })
  }

  const dataUser = {
    email: email,
    nama: nama,
    password: password,
    alamat_user: alamat_user,
    role: 'user'
  }

  const saveUser = await users.create(dataUser)
  if (saveUser == null) {
    return res.status(400).json({
      message: 'Fail to save data'
    })
  }

  res.status(200).json({
    status: 200,
    message: 'Register Successfull',
    response: saveUser.dataValues
  })
})

// Login
app.post('/login', async (req, res) => {
  const { email = '', password = '' } = req.body
  if (email == '' || password == '') {
    if (email == '') {
      return res.status(400).json({
        message: 'E-mail cannot be empty'
      })
    }
    if (password == '') {
      return res.status(400).json({
        message: 'Password cannot be empty'
      })
    }
  }

  const myUser = await users.findOne({
    where: {
      email: email
    }
  })
  if (myUser == null) {
    return res.status(400).json({
      message: 'E-mail wrong'
    })
  }
  if (myUser.dataValues.password != password) {
    return res.status(400).json({
      message: 'Password wrong'
    })
  }
  res.status(200).json({
    status: 200,
    message: 'Login successfull',
    response: {
      id: myUser.dataValues.id,
      nama: myUser.dataValues.nama,
      role: myUser.dataValues.role,
    }
  })
})

// GET detail order
app.get('/detailorders', (req, res) => {
  detail_orders.findAll()
    .then(detail_orders => {
      res.status(200).json(detail_orders)
    })
})

// GET detail order by id
app.get('/detailorders/:id', (req, res) => {
  detail_orders.findOne({
    where: { id: req.params.id }
  })
    .then(detail_orders => {
      res.status(200).json(detail_orders)
    })
})

// Users Orders
const dataOrder = {
  user_id: user_id,
  time_order: time_order,
  status_order: status_order
}

app.post('/orders', (req, res) => {
  orders.create(dataOrder)
    .then(detail_orders => {
      res.status(200).json(detail_orders)
    }).catch(err => {
      res.status(400).json("Cannot input order")
    })
})

// GET Items
app.get('/items', (req, res) => {
  items.findAll()
    .then(items => {
      res.status(200).json(items)
    })
})

// GET Item by id
app.get('/items/:id', (req, res) => {
  items.findOne({
    where: { id: req.params.id }
  })
    .then(items => {
      res.status(200).json(items)
    })
})

// Input Item by admin
const dataItem = {
  nama_item: nama_item,
  harga_item: harga_item,
  stock: stock
}

app.post('/items', (req, res) => {
  orders.create(dataItem)
    .then(items => {
      res.status(200).json(items)
    }).catch(err => {
      res.status(400).json("Cannot Input Item")
    })
})

// Update Item
const dataUpdItem = {
  nama: req.body.nama,
  harga_item: req.body.harga_item,
  stock: req.body.stock
}

app.put('/items/:id', (req, res) => {
  items.update(dataUpdItem), {
    where: { id: req.params.id }
  }
})
  .then(() => {
    res.status(200).json('Item Updated')
  }).catch(err => {
    res.status(400).json('Update Item Failed')
  })

// Delete Item
app.delete('/items/:id', (req, res) => {
  items.destroy({
    where: { id: req.params.id }
  })
    .then(() => {
      res.status(200).json("Item deleted")
    }).catch(err => {
      res.status(400).json("Can't delete item")
    })

  app.use(function (err, req, res, next) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  })

  app.listen(port, () => {
    console.log(`server running at port ${port}`)
  })
})