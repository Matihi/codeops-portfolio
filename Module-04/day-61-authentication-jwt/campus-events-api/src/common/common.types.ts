export const Roles = ['admin', 'staff'] as const;
export type Role = (typeof Roles)[number];
