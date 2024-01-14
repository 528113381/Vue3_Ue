import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ConsultType, FastType } from '@/enums/index.ts'

export const useConsult = defineStore(
  'consult',
  () => {
    const consult = ref<any>({})
    // 医院类型
    const setIllnessType = (value: FastType) => {
      consult.value.illnessType = value
    }
    // 极速就诊类型
    const setType = (value: ConsultType) => {
      consult.value.type = value
    }
    // 看病科室
    const setDepId = (id: string) => {
      consult.value.depId = id
    }
    const setIllness = (obj: any) => {
      consult.value.illnessDesc = obj.illnessDesc
      consult.value.illnessTime = obj.illnessTime
      consult.value.consultFlag = obj.consultFlag
      consult.value.pictures = obj.pictures
    }
    const clearIllness = () => {
      delete consult.value.illnessDesc
      delete consult.value.illnessTime
      delete consult.value.consultFlag
      delete consult.value.pictures
    }
    const setPatientId = (id: string) => {
      consult.value.patientId = id
    }
    return { consult, setIllnessType, setType, setDepId, setIllness, clearIllness, setPatientId }
  },
  {
    persist: true //开启本地存储
  }
) 