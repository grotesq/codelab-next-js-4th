import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from 'App/Models/Role'

export default class AuthController {
  public async signUp({ auth, request }: HttpContextContract) {
    const params = request.only(['email', 'password', 'name'])
    const user = await User.create(params)
    const role = await Role.findByOrFail('code', 'general')
    user.related('roles').sync([role.id])
    const token = auth.use('api').generate(user)
    return {
      user,
      token,
    }
  }
  public async signIn({ auth, request }: HttpContextContract) {
    const params = request.only(['email', 'password'])
    const token = await auth.use('api').attempt(params.email, params.password)
    const user = await User.findByOrFail('email', params.email)
    await user.load('roles')
    return {
      user,
      token,
    }
  }
  public async update({ auth, request, response }: HttpContextContract) {
    const params = request.only(['password', 'new_password'])
    const user = auth.user!
    if (!(await Hash.verify(user.password, params.password))) {
      response.badRequest({ message: '비밀번호가 잘못되었습니다.' })
    } else {
      user.password = params.new_password
      await user.save()
      return { message: '변경되었습니다.' }
    }
  }
}
