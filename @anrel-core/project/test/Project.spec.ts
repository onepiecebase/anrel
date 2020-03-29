import { expect } from 'chai'
import Project from '@/Project'

describe('测试 Project', () => {
  it('能够 初始化', () => {
    const target = new Project()
    expect(target).to.be.instanceOf(Project)
  })
})
