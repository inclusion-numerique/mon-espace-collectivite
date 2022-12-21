export type DashboardScope =
  | { county: { code: string } }
  | { district: { code: string } }
  | { intercommunality: { code: string } }
  | { municipality: { code: string } }
