import { expect } from 'chai'
import Git from '@/Git'

describe('测试 Git', () => {
  it('能够 初始化', () => {
    const target = new Git()
    expect(target).to.be.instanceOf(Git)
  })
})
