// 枚举必须写在.ts文件 不能写在.d.ts文件
export enum ConsultType {
  // 找医生
  Doctor = 1,
  // 极速问诊
  Fast,
  // 开药问诊
  Medication
}

export enum FastType {
  // 普通医生
  Normal,
  // 三甲医生
  Snecialty
}

// 患病时间泛型
export enum IllnessTime {
  Week = 1,
  Month,
  HalfAYear,
  Year
}

// 是否就诊过
export enum Flag {
  NoAttendance,
  Attendance
}