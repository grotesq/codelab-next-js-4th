import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MeController {
  public async read({ auth }: HttpContextContract) {
    return auth.user
  }
}
