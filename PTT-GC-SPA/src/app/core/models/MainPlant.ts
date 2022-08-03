export class MainPlant {
  constructor() { }
  public mainPlanId: number;
  public eMocTitle: string;
  public initiativeId: number;
  public plant: string;
  public areaUnit: string;
  public typeOfChange: string;
  public mocCategory: string;
  public expireDate: Date;
  public detailOfTheChange: string;
  public initialListOfPeople: string;
  public emocNo: string;
  public mocChampion: string;
  public isMainPlant: boolean;
  public goalAchievement: string;
  public specifiedGoalAchievement: string;
  public assumptionOfGoal: string;
  public reasonForChange: string;
}

export interface MocStatus {
  status: string;
  message: string;
  moCs: any[];
}
