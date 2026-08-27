export type OfficerRole = 'INSPECTOR' | 'SENIOR_LEGAL_OFFICER' | 'CONTROLLER' | 'DEMO_USER';

export interface OfficerProfile {
  id: string;
  name: string;
  badgeNumber: string;
  designation: string;
  department: string;
  circleZone: string;
  email: string;
  role: OfficerRole;
  avatarUrl?: string;
  activeInspectionsToday: number;
  totalInspectionsCount: number;
}
