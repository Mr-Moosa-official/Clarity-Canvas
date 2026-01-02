import type { Student, Course, Enrollment, Performance } from './types';

export const students: Student[] = [
  { id: 'S001', name: 'Alice Johnson', joinDate: '2023-01-15' },
  { id: 'S002', name: 'Bob Williams', joinDate: '2023-02-20' },
  { id: 'S003', name: 'Charlie Brown', joinDate: '2023-03-10' },
  { id: 'S004', name: 'Diana Miller', joinDate: '2023-01-25' },
  { id: 'S005', name: 'Ethan Garcia', joinDate: '2023-04-01' },
];

export const courses: Course[] = [
  { id: 'Math101', title: 'Introduction to Algebra', instructor: 'Dr. Smith' },
  { id: 'Sci202', title: 'Basic Physics', instructor: 'Dr. Jones' },
  { id: 'Hist301', title: 'World History', instructor: 'Prof. Davis' },
  { id: 'Eng101', title: 'English Composition', instructor: 'Prof. White' },
];

export const enrollments: Enrollment[] = [
  { studentId: 'S001', courseId: 'Math101', enrollmentDate: '2023-01-15' },
  { studentId: 'S001', courseId: 'Sci202', enrollmentDate: '2023-01-15' },
  { studentId: 'S002', courseId: 'Math101', enrollmentDate: '2023-02-20' },
  { studentId: 'S002', courseId: 'Hist301', enrollmentDate: '2023-02-20' },
  { studentId: 'S003', courseId: 'Sci202', enrollmentDate: '2023-03-10' },
  { studentId: 'S003', courseId: 'Eng101', enrollmentDate: '2023-03-10' },
  { studentId: 'S004', courseId: 'Math101', enrollmentDate: '2023-01-25' },
  { studentId: 'S004', courseId: 'Eng101', enrollmentDate: '2023-01-25' },
  { studentId: 'S005', courseId: 'Hist301', enrollmentDate: '2023-04-01' },
  { studentId: 'S005', courseId: 'Sci202', enrollmentDate: '2023-04-01' },
];

export const performance: Performance[] = [
  { studentId: 'S001', courseId: 'Math101', score: 85, completionRate: 95, engagementLevel: 80 },
  { studentId: 'S001', courseId: 'Sci202', score: 92, completionRate: 100, engagementLevel: 88 },
  { studentId: 'S002', courseId: 'Math101', score: 65, completionRate: 70, engagementLevel: 55 },
  { studentId: 'S002', courseId: 'Hist301', score: 78, completionRate: 85, engagementLevel: 70 },
  { studentId: 'S003', courseId: 'Sci202', score: 58, completionRate: 60, engagementLevel: 45 },
  { studentId: 'S003', courseId: 'Eng101', score: 72, completionRate: 80, engagementLevel: 65 },
  { studentId: 'S004', courseId: 'Math101', score: 95, completionRate: 100, engagementLevel: 92 },
  { studentId: 'S004', courseId: 'Eng101', score: 88, completionRate: 98, engagementLevel: 85 },
  { studentId: 'S005', courseId: 'Hist301', score: 81, completionRate: 90, engagementLevel: 75 },
  { studentId: 'S005', courseId: 'Sci202', score: 75, completionRate: 88, engagementLevel: 68 },
];
