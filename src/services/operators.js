import { Parse } from './parseConfig'

class Operators {
  static async getAllOperators() {
    return new Promise((resolve, reject) => {
      const Tb = Parse.Object.extend('User')
      let q = new Parse.Query(Tb)

      q.equalTo('type', 'operator')
      q.equalTo('status', 1)
      q.doesNotExist('deletedAt')
      q.find({ useMasterKey: true }).then((res) => {
          resolve(JSON.parse(JSON.stringify(res)))
        }, (err) => {
          reject(err)
        }
      )
    })
  }

  static async getOperatorById(id) {
    return new Promise((resolve, reject) => {
      const Tb = Parse.Object.extend('User')
      let q = new Parse.Query(Tb)

      q.equalTo('type', 'operator')
      q.equalTo('status', 1)
      q.doesNotExist('deletedAt')
      q.get(id, { useMasterKey: true }).then((res) => {
          console.log(JSON.parse(JSON.stringify(res)))
          resolve(JSON.parse(JSON.stringify(res)))
        }, (err) => {
          reject(err)
        }
      )
    })
  }

  static async addOperator(data) {
    return new Promise((resolve, reject) => {
      let user = new Parse.User()

      user.set('name', data.name)
      user.set('username', data.username)
      user.set('password', data.password)
      user.set('email', data.email)
      user.set('type', 'operator')
      user.set('status', 1)
      user.set('level', data.level)

      user.save(null, {useMasterKey: true}).then((res) => {
          console.log('new operator', res)
          resolve(JSON.parse(JSON.stringify(res)))
        }, (err) => {
          reject(err)
        }
      )
    })
  }

  static async updateOperator(data) {
    return new Promise((resolve, reject) => {
      const User = new Parse.Object.extend('User')
      let q = new Parse.Query(User)

      q.get(data.id).then((res) => {
          res.set('name', data.name)
          res.set('username', data.username)
          res.set('password', data.password)
          res.set('email', data.email)
          res.set('type', 'operator')
          res.set('level', data.level)

          console.log('new operator', res)

          res.save(null, { useMasterKey: true }).then((r) => {
              resolve(JSON.parse(JSON.stringify(r)))
            }, (err) => reject(err)
          )
        }, (err) => {
          reject(err)
        }
      )
    })
  }

  static async deleteOperator(id) {
    return new Promise((resolve, reject) => {
      const Tb = Parse.Object.extend('User')
      let q = new Parse.Query(Tb)

      q.get(id).then((res) => {
          res.set('status', 500)
          res.set('deletedAt', new Date())
          res.save(null, { useMasterKey: true }).then((r) => {
              resolve(JSON.parse(JSON.stringify(r)))
            }, (err) => reject(err)
          )
        }, (err) => {
          reject(err)
        }
      )
    })
  }
}

export default Operators
