/**
 * Date: 2021-11-03 15:10:10
 * Startables 表格组件 props 配置文件(未完善)
 */

import { Column as BaseColumn } from 'vxe-table/types/column';

/**
 * 表格
 */
export declare class ShTables {
  /**
   * 是否显示序号
   */
  index?: boolean;

  /**
   * 是否显示复选框
   */
  selection?: boolean;

  /**
   *  是否显示 table 操作列
   */
  showAction?: boolean;

  /**
   *  table 操作列宽度
   */
  actionWidth?: string | number;

  /**
   *  table 数组字段配置
   */
  columns: Column[];

  /**
   *  table 数据
   */
  tableData: any[];

  /**
   *  列对齐方式
   */
  align?: TableAlign;

  /**
   *  是否显示页脚，（合计）
   */
  showFooter?: boolean;

  /**
   *  合计字段配置
   */
  summaryFields?: SummaryFields[];

  /**
   *  表格的高度
   */
  height?: string | number;

  /**
   *  所有内容过长时显示方式
   */
  showOverflow?: Tooltip;

  /**
   *  table 横向虚拟滚动配置
   */
  scrollX?: {
    gt?: number;
    oSize?: number;
    [key: string]: any;
  };

  /**
   *  table 纵向虚拟滚动配置
   */
  scrollY?: {
    gt?: number;
    oSize?: number;
    [key: string]: any;
  };

  /**
   *  表格的尺寸
   */
  size?: 'medium' | 'small' | 'mini';

  tooltipEffect?: 'dark' | 'light' | null;
}

export type Tooltip = boolean | 'ellipsis' | 'title' | 'tooltip' | null;

export type TableAlign = 'left' | 'center' | 'right' | null;

export interface SummaryFields {
  prop: string;
  method?: () => number | string;
}

export type FooterOverflow = Tooltip;
export interface Column extends BaseColumn {
  field: string;
  title: string;
  tooltip?: Tooltip;
  width?: number | string;
  minWidth?: number | string;
}
