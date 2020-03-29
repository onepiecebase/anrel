import { expect } from 'chai'
import { bootstrap } from '@/commander/bootstrap'

describe('测试 Project', () => {
  it('能够 初始化', () => {
    expect(bootstrap).to.be.a('function')
  })
})
