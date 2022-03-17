/**
 * Date: 2021-11-03 15:10:10
 * Shtables 表格组件 props 配置文件(未完善)
 */

import { Column as BaseColumn } from 'vxe-table/types/column'

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
   *  table 数组字段配置
   */
  columns: Column[];

  /**
   *  table 数据
   */
  tableData: any[];

  /**
   *  分页 页码
   */
  pageIndex: number;

  /**
   *  数据总条数
   */
  total: number;

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
   *  表尾所有内容过长时显示方式
   */
  showFooterOverflow?: FooterOverflow

  /**
   *  表格是否显示加载中
   */
  loading?: boolean;

  /**
   *  表格的高度
   */
  height?: string | number;

  /**
   *  是否显示分页
   */
  pageState?: boolean;

  /**
   *  table 列表操作按钮
   */
  button?: any[] | boolean;

  /**
   *  table 提示
   */
  tip?: string;

  /**
   *  操作按钮显示隐藏配置
   */
  functionVerification?: FunctionVerification;

  /**
   *  所有内容过长时显示方式
   */
  showOverflow?: Tooltip;

  /**
   *  是否有 tab 项
   */
  haveTab?: boolean;

  /**
   *  是否显示 table 操作列
   */
  showAction?: boolean;

  /**
   *  table 操作列宽度
   */
  actionWidth?: string | number;


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
   *  删除数据时提交数据字段
   */
  delName?: string;

  /**
   *  数据操作接口配置
   */
  url?: any[] | object;


  /**
   *  表格的尺寸
   */
  size?: 'medium' | 'small' | 'mini';

  tooltipEffect?: 'dark' | 'light' | null;

  /**
   *  表格操作按钮配置
   */
  operation?: any[] | boolean;

  /**
   *  格式化列表数据自定义函数
   */
  filter?: {
    [key: string]: () => any
  }

}

export type Tooltip = boolean | 'ellipsis' | 'title' | 'tooltip' | null;

export type TableAlign = 'left' | 'center' | 'right' | null;

export type FilerMethod = (row: object, prop: string) => string | number;

export interface SummaryFields {
  prop: string;
  method?: () => number | string
}

export type FunctionVerification = {
  [key: string]: () => boolean
}

export type FooterOverflow = Tooltip
export interface Column extends BaseColumn {
  prop: string;
  label: string;
  tooltip?: Tooltip;
  width?: number | string;
  minWidth?: number | string;
  filer?: string
}

