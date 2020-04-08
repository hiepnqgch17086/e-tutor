import { types } from "mobx-state-tree";
import ProfilePageData from "../pages/ProfilePage/data";

const id = types.model({
  id: types.optional(types.number, 0)
})
  .actions(self => ({
    setId(newId: number = 0): void {
      self.id = newId
    }
  }))

export const blogId = types.model({
  blogId: types.optional(types.number, 0)
})
  .actions(self => ({
    setBlogId(newId: number): void {
      self.blogId = newId
    }
  }))

export const cloudId = types.model({
  cloudId: types.optional(types.string, '')
})
  .actions(self => ({
    setCloudId(newId: string): void {
      self.cloudId = newId
    }
  }))

export const creatorId = types.model({
  creatorId: types.optional(
    types.union(types.string, types.number),
    ""
  )
})
  .actions(self => ({
    setDefaultCreatorId() {
      self.creatorId = ProfilePageData.currentUser.id
    }
  }))

export const classId = types.model({
  classId: types.optional(types.number, 0)
})
  .actions(self => ({
    setClassId(newId: number): void {
      self.classId = newId
    }
  }))

export const commentId = types.model({
  commentId: types.optional(types.number, 0)
})
  .actions(self => ({
    setCommentId(newId: number): void {
      self.commentId = newId
    }
  }))

export const studentId = types.model({
  studentId: types.optional(types.number, 0)
})
  .actions(self => ({
    setStudentId(newId: number): void {
      self.studentId = newId
    }
  }))

export const tutorId = types.model({
  tutorId: types.optional(types.number, 0)
})
  .actions(self => ({
    _getTutorIdConstraint() {
      if (self.tutorId) return ''
      return 'Tutor is required!'
    },
    setTutorId(newId: number): void {
      self.tutorId = newId
    }
  }))

export const permissionId = types.model({
  permissionId: types.optional(types.number, 0)
})
  .actions(self => ({
    setPermissionId(newId: number): void {
      self.permissionId = newId
    }
  }))

export const userId = types.model({
  userId: types.optional(types.number, 0)
})
  .actions(self => ({
    setUserId(newId: number): void {
      self.userId = newId
    }
  }))

export default id
