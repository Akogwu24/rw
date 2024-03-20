import { StyleSheet } from 'react-native';
import axiosInstance, { API_ENDPOITS } from '../../services/api';

export interface ViolenceReport {
  name: string;
  phoneNumber: string;
  altPhoneNumber: string;
  dateOfBirth: string;
  address: string;
  sex: string;
  reporterType: string;
  report: string;
  preferredLanguage: string;
  hasReportedPolice: boolean;
  policeReportAddress: string;
  hasReceivedMedicalAttention: boolean;
  hasDisability: boolean;
  disability: number;
  maritalStatus: string;
  marriageType: string;
  marriageDate: string;
  employmentStatus: string;
}

export async function reportViolenceIncident(payload: ViolenceReport) {
  console.log('payload', payload);
  const { data } = await axiosInstance.post(API_ENDPOITS.REPORT_INCIDENT, payload);

  return data;
}

export const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 3,
    paddingVertical: 12,
    marginBottom: 10,
  },
  inputText: {
    color: '#fff',
  },
});

export const disabilities = [
  {
    id: 1,
    name: 'Visual Impairment',
    category: 'Visual Impairment',
    createdAt: '2021-09-22T19:32:26.000000Z',
    updatedAt: '2021-09-22T19:32:26.000000Z',
  },
  {
    id: 2,
    name: 'Speech Impairment',
    category: 'Speech Impairment',
    createdAt: '2021-09-22T19:32:26.000000Z',
    updatedAt: '2021-09-22T19:32:26.000000Z',
  },
  {
    id: 3,
    name: 'Physically Disability',
    category: 'Physically Disability',
    createdAt: '2021-09-22T19:32:26.000000Z',
    updatedAt: '2021-09-22T19:32:26.000000Z',
  },
  {
    id: 4,
    name: 'Hearing Impairment',
    category: 'Hearing Impairment',
    createdAt: '2021-10-30T15:05:01.000000Z',
    updatedAt: '2021-10-30T15:05:01.000000Z',
  },
];
