import { expect } from 'chai'
import Version from '@/Version'

describe('测试 Version', () => {
  it('能够 初始化', () => {
    const target = new Version()
    expect(target).to.be.instanceOf(Version)
  })
})
