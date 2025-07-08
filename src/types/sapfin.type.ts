export interface InterfaceFile {
  id: string;
  sourceName: string;
  interfaceName: string;
  fileName: string;
}

export interface Interface {
  id: string;
  version: number;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  name: string;
  displayName: string;
}

export interface Source {
  id: string;
  version: number;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  name: string;
  displayName: string;
  interfaces: Interface[];
}
