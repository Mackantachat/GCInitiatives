import { InitiativeMember } from './IMeetingList';
import { IStreamData } from './IStreamData';

export interface IMemberPIC {
  picListId: number;
  meetingDate: Date;
  centerStream: string[];
  upStream: string[];
  downStream: string[];
  initiativeId: number[];
  initiativeMember: InitiativeMember[];
  totalInitialtive: number;
  statusPic: string;
}
