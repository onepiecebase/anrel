import { expect } from 'chai'
import Publish from '@/Publish'

describe('测试 Publish', () => {
  it('能够 初始化', () => {
    const target = new Publish()
    expect(target).to.be.instanceOf(Publish)
  })
})
