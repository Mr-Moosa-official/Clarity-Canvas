export type Student = {
  id: string;
  name: string;
  joinDate: string;
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
};

export type Enrollment = {
  studentId: string;
  courseId: string;
  enrollmentDate: string;
};

export type Performance = {
  studentId: string;
  courseId: string;
  score: number;
  completionRate: number;
  engagementLevel: number;
};
