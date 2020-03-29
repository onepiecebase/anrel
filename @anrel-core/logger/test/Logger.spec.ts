import { expect } from 'chai'
import Logger from '@/Logger'

describe('测试 Logger', () => {
  it('能够 初始化', () => {
    const target = new Logger()
    expect(target).to.be.instanceOf(Logger)
  })
})
