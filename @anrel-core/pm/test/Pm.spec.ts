import { expect } from 'chai'
import Pm from '@/Pm'

describe('测试 Pm', () => {
  it('能够 初始化', () => {
    const target = new Pm()
    expect(target).to.be.instanceOf(Pm)
  })
})
