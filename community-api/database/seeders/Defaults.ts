import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class DefaultsSeeder extends BaseSeeder {
  public async run() {
    await Role.createMany([
      { code: 'super-admin', description: '최고 관리자' },
      { code: 'admin', description: '관리자' },
      { code: 'general', description: '일반 사용자' },
    ])
    const superAdminRole = await Role.findByOrFail('code', 'super-admin')
    const admin = await User.create({
      email: 'super-admin@admin.com',
      password: 'super-admin@admin.com',
      name: 'Super Admin',
    })
    await admin.related('roles').sync([superAdminRole.id])
  }
}
