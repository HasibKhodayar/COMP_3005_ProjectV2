export interface Height {
    feet:number,
    inches:number
}

export enum EquipmentCondition {
  EXCELLENT = 'Excellent',
  GOOD = 'Good',
  FAIR = 'Fair',
  POOR = 'Poor',
  NEEDS_REPAIR = 'Needs Repair',
}


export enum PurchaseType {
  PRIVATE_SESSION = 'Private Session',
  GROUP_SESSION = 'Group Session',
}

export enum ChargeType {
  PRIVATE_SESSION_CHARGE = -100,
  PRIVATE_SESSION_REFUND = 100,
  GROUP_SESSION_CHARGE = -50,
  GROUP_SESSION_REFUND = 50,
}