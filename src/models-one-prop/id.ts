import { types } from "mobx-state-tree";

const id = types.model({
  id: types.optional(types.string, '')
})
  .actions(self => ({
    setId(newId: string = ''): void {
      self.id = newId
    }
  }))

export const blogId = types.model({
  blogId: types.optional(types.string, '')
})
  .actions(self => ({
    setBlogId(newId: string = ''): void {
      self.blogId = newId
    }
  }))

export const classId = types.model({
  classId: types.optional(types.string, '')
})
  .actions(self => ({
    setClassId(newId: string = ''): void {
      self.classId = newId
    }
  }))

export const commentId = types.model({
  commentId: types.optional(types.string, '')
})
  .actions(self => ({
    setCommentId(newId: string = ''): void {
      self.commentId = newId
    }
  }))

export const studentId = types.model({
  studentId: types.optional(types.string, '')
})
  .actions(self => ({
    setStudentId(newId: string = ''): void {
      self.studentId = newId
    }
  }))

export const tutorId = types.model({
  tutorId: types.optional(types.string, '')
})
  .actions(self => ({
    setTutorId(newId: string = ''): void {
      self.tutorId = newId
    }
  }))

export const permissionId = types.model({
  permissionId: types.optional(types.string, '')
})
  .actions(self => ({
    setPermissionId(newId: string = ''): void {
      self.permissionId = newId
    }
  }))

export const userId = types.model({
  userId: types.optional(types.string, '')
})
  .actions(self => ({
    setUserId(newId: string = ''): void {
      self.userId = newId
    }
  }))

export default id
