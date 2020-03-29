import { expect } from 'chai'
import Bootstrap from '@/Bootstrap'

describe('测试 Bootstrap', () => {
  it('能够 初始化', () => {
    const target = new Bootstrap()
    expect(target).to.be.instanceOf(Bootstrap)
  })
})
