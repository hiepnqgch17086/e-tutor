import { types } from "mobx-state-tree";
import ProfilePageData from "../pages/ProfilePage/data";
import { User } from "../models-one-entity/Users";

const id = types.model({
  id: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setId(newId: string | number): void {
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
    setBlogId(newId: string | number): void {
      self.blogId = newId
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
  classId: types.optional(
    types.union(types.string, types.number),
    ''
  )
})
  .actions(self => ({
    setClassId(newId: string | number): void {
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
    setCommentId(newId: string | number): void {
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
    setStudentId(newId: string | number): void {
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
    _getTutorIdConstraint() {
      if (self.tutorId) return ''
      return 'Tutor is required!'
    },
    setTutorId(newId: string | number): void {
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
    setPermissionId(newId: string | number): void {
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
    setUserId(newId: string | number): void {
      self.userId = newId
    }
  }))

export default id
