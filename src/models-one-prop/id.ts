import { types } from "mobx-state-tree";

const id = types.model({
  id: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setId(newId: string = ''): void {
      self.id = newId
    }
  }))

export const blogId = types.model({
  blogId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setBlogId(newId: string = ''): void {
      self.blogId = newId
    }
  }))

export const classId = types.model({
  classId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setClassId(newId: string = ''): void {
      self.classId = newId
    }
  }))

export const commentId = types.model({
  commentId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setCommentId(newId: string = ''): void {
      self.commentId = newId
    }
  }))

export const studentId = types.model({
  studentId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setStudentId(newId: string = ''): void {
      self.studentId = newId
    }
  }))

export const tutorId = types.model({
  tutorId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setTutorId(newId: string = ''): void {
      self.tutorId = newId
    }
  }))

export const permissionId = types.model({
  permissionId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setPermissionId(newId: string = ''): void {
      self.permissionId = newId
    }
  }))

export const userId = types.model({
  userId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setUserId(newId: string = ''): void {
      self.userId = newId
    }
  }))

export default id
