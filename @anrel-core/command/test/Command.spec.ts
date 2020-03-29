import { expect } from 'chai'
import Command from '@/Command'

describe('测试 Command', () => {
  it('能够 初始化', () => {
    const target = new Command()
    expect(target).to.be.instanceOf(Command)
  })
})
