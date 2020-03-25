import { expect } from 'chai'
import Project from '@/Project'

describe('测试 Project', () => {
  it('能够 初始化', () => {
    const pro = new Project()
    expect(pro).to.be.instanceOf(Project)
  })
})
