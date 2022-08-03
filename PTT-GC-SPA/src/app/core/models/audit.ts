export interface Audit {
  id: number;
  fieldName: string;
  oldValue: string;
  newValue: string;
  actionDate: Date;
  actionBy: string;
  commentDetail: string;
  commentBy: string;
  commentByName: string;
  commentDate: Date;
}

