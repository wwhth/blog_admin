

// 菜单类型
export interface menuType {
  id: number;
  name: string;
  url: string;
  icon?: string;
  children?: menuType[];
  sort?: number;
  type?: number;
  parentId?: number;
}

