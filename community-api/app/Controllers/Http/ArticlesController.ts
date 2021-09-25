import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'

export default class ArticlesController {
  public async list({ request }: HttpContextContract) {
    const { page, perPage } = request.qs()
    return await Article.query()
      .orderBy('created_at', 'desc')
      .paginate(page ?? 1, perPage ?? 12)
  }

  public async read({ request }: HttpContextContract) {
    const { id } = request.params()
    return await Article.findOrFail(id)
  }

  public async create({ auth, request }: HttpContextContract) {
    const { category, subject, content } = request.only(['category', 'subject', 'content'])
    const user = auth.user!
    return await Article.create({
      user_id: user.id,
      category,
      subject,
      content,
    })
  }
  public async update({ auth, request }: HttpContextContract) {
    const { id } = request.params()
    const params = request.only(['category', 'subject', 'content'])
    const user = auth.user!
    const article = await Article.query().where('user_id', user.id).where('id', id).firstOrFail()
    await article.merge(params)
    await article.save()
    return article
  }

  public async delete({ auth, request }: HttpContextContract) {
    const { id } = request.params()
    const user = auth.user!
    const article = await Article.query().where('user_id', user.id).where('id', id).firstOrFail()
    await article.delete()
    return { message: 'ok' }
  }
}
